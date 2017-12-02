export default(i,t=0)=>(i.split`
`.map((l,x,y,p=l.split`	`)=>t+=Math.max(...p)-Math.min(...p)),t)
