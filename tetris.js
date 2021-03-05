 document.addEventListener('DOMContentLoaded', ()=> {
     const grid =document.querySelector('.grid')
     let squares= Array.from(document.querySelectorAll('.grid div'))
     
     const startbtn=document.querySelector('#start-button')
     const leftbtn=document.querySelector('#left')
     const rotbtn=document.querySelector('#rotate')
     const rightbtn=document.querySelector('#right')
     let colours=["orange"]
     let count=0
    
    
     const width =10 ;
     let nextchoice=0

     const lTetromino=[
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]

     ]
     const zTetromino=[[0,width,width+1,width*2+1],
     [width+1, width+2,width*2,width*2+1],
     [0,width,width+1,width*2+1],
     [width+1, width+2,width*2,width*2+1]]

     const iTetromino=[[1,width+1,width*2+1,width*3+1],
     [width,width+1,width+2,width+3],
     [1,width+1,width*2+1,width*3+1],
     [width,width+1,width+2,width+3]]
    
     const tTetromino=[[1,width,width+1,width+2],
     [1,width+1,width+2,width*2+1],
     [width,width+1,width+2,width*2+1],
     [1,width,width+1,width*2+1]]

     const sqTetromino=[[0,1,width,width+1],
     [0,1,width,width+1],
     [0,1,width,width+1],
     [0,1,width,width+1]]

    const allTetrominos=[lTetromino,zTetromino,iTetromino,tTetromino,sqTetromino]

   let currentPos= 4;
   let choice=Math.floor(Math.random()*allTetrominos.length)
   let rot=0
   let current=allTetrominos[choice][rot];
    let colour
      function draw(){
          
        colour=Math.floor(Math.random()*colours.length)
          current.forEach( index => {
              squares[currentPos+index ].classList.add(colours[colour])
          })
      }



    function undraw(){
    current.forEach( index => {
        squares[currentPos+index ].classList.remove(colours[colour])
    })}
    var speed= 600
    
    document.addEventListener("keyup",control)
    leftbtn.addEventListener('click',moveleft)
    rightbtn.addEventListener('click',moveright)
    rotbtn.addEventListener('click',rotate)
    

    
    function control(e){
        if(e.keyCode === 37)
        {
            moveleft()
            
        }
        else if(e.keyCode===39)
        {
            moveright()
        }
        else if(e.keyCode===38)
        {
            rotate()
        }
        
 

    }

        let timer=setInterval(movedown,speed)

        function movedown()
        {
            console.log("hi")
            undraw()
            currentPos += width
            draw()
            freeze()
   
        }

     function freeze()   
    {
        if(current.some(index=> squares[currentPos+index+width].classList.contains('taken'))){

            
            current.forEach(index=> squares[currentPos+index].classList.add('taken'))
            choice=Math.floor(Math.random()*allTetrominos.length)
            count++
            document.getElementById('score').innerText=count
            current=allTetrominos[choice][rot]
            
            currentPos=4
            draw()
            

        }
    }
    



    function moveleft()
    {
        undraw()
        const isleftedge=current.some(index=>(currentPos+index)%width===0)

        if(!isleftedge) currentPos -= 1
         
         if(current.some(index=> squares[currentPos+index].classList.contains('taken'))){
           currentPos+=1
         
    }
        draw()

    }
    function moveright()
    {
        undraw()
        const isrightedge=current.some(index=>(currentPos+index+1)%width===0)

        if(!isrightedge) currentPos += 1
         
         if(current.some(index=> squares[currentPos+index].classList.contains('taken'))){
           currentPos-=1
         
    }
        draw()

    }
     function rotate()
     {
        undraw()
        rot+=1
        if(rot===4){
        rot=0    
        }
        
        current=allTetrominos[choice][rot]
        draw()
     }
startbtn.addEventListener('click',()=>{

    if(timer){
        clearInterval(timer)
        timer=null
    }
    else{
        draw()
        timer=setInterval(movedown,speed)
        
    }
})

 }) 

