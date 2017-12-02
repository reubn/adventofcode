export default(a,b=0)=>(a.split`
`.map((c,d,e,f=c.split`	`,g)=>(f.find(h=>f.find(j=>h!=j&&!(h%j)&&(g=h/j))),b+=g)),b)
