export default(a,b=0)=>(a.split`
`.map(c=>(c=c.split`	`,b+=Math.max(...c)-Math.min(...c))),b)
