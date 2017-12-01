export default a=>{let{length:b}=a,c=0,d=0;for(;d<b;d++)a[d]==a[(d+b/2)%b]&&(c+=+a[d]);return c}
