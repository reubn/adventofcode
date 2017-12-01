export default a=>[...a].reduce((b,c,d,{length:e})=>c==a[-~d%e]?+c+b:b,0)
