export default(a,b=0)=>(a.split`
`.map(c=>(c=c.split`	`,c.map(d=>c.map(e=>d==e||d%e||(a=d/e))),b+=a)),b)
