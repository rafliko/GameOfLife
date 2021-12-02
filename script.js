size = 8;
w = 100;
h = 100;
cells = new Array(w*h);
speed = 100;

canv = document.getElementById("canv");
ctx = canv.getContext("2d");
canv.width = w*size;
canv.height = h*size;

x=0;
y=0;
for(i=0;i<cells.length;i++)
{
    cells[i] = {x:x, y:y, alive:Math.floor(Math.random() * 6), survived:true};
    x++;
    if(x==w)
    {
        x = 0;
        y++;
    }
}

setInterval(rules, speed);
setInterval(draw, speed);

function rules()
{
    count = 0;
    index = 0;
    for(i=0;i<cells.length;i++)
    {
        if(cells[i].x>0)
        {
            index = cells[i].x-1 + (cells[i].y)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].x<w-1)
        {
            index = cells[i].x+1 + (cells[i].y)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].x>0 && cells[i].y>0)
        {
            index = cells[i].x-1 + (cells[i].y-1)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].x<w-1 && cells[i].y>0)
        {
            index = cells[i].x+1 + (cells[i].y-1)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].x>0 && cells[i].y<h-1)
        {
            index = cells[i].x-1 + (cells[i].y+1)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].x<w-1 && cells[i].y<h-1)
        {
            index = cells[i].x+1 + (cells[i].y+1)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].y>0)
        {
            index = cells[i].x + (cells[i].y-1)*w;
            if(cells[index].alive == 1) count++;
        }
        if(cells[i].y<h-1)
        {
            index = cells[i].x + (cells[i].y+1)*w;
            if(cells[index].alive == 1) count++;
        }

        if(count == 3) cells[i].survived = true;
        else if(count != 2) cells[i].survived = false;
        count = 0;
    }

    for(i=0;i<cells.length;i++)
    {
        if(cells[i].survived) cells[i].alive = 1;
        else cells[i].alive = 0;
    }
}

function draw()
{
    ctx.clearRect(0,0,w*size,h*size);
    for(i=0;i<cells.length;i++)
    {
        if(cells[i].alive == 1)
        {
            ctx.fillStyle = "white";
        }
        else
        {
            ctx.fillStyle = "black";
        }
        ctx.fillRect(cells[i].x*size, cells[i].y*size, size, size);
    }
}