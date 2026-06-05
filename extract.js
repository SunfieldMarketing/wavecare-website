const fs=require('fs');
let c=fs.readFileSync('archive/about.html','utf8');
let m=c.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if(m){
  let b=m[1].replace(/src="data:image[^"]+"/g, 'src="/placeholder.jpg"');
  fs.writeFileSync('temp_body.txt', b);
}
