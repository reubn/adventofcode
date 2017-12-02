export default(a,b=0)=>(a.split`
`.map(c=>b+=Math.max(...c=c.split`	`)-Math.min(...c)),b)
