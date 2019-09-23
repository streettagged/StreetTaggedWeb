
export function buildImage (item,newWidth,newHeight) {
    const CloudFrontUrl="https://d3lrj4ps7zo1fq.cloudfront.net"
   
    let imageRequest = JSON.stringify({
      "bucket": "street-art-uploads",
      "key":  "public/"+item.substring(item.lastIndexOf('/')+1),
      
        
      "edits": {
        "rotate": 0,
        "grayscale": true,
        "resize": {
          "width": newWidth,
          "height": newHeight,
        }
    
      
      }
    });
    let url = `${CloudFrontUrl}/${btoa(imageRequest)}`;
    return url;
    
  }

//these only work for files in the root of the s3 bucket
//https://d3lrj4ps7zo1fq.cloudfront.net/240x240/filters:grayscale()/abc.jpg
//https://d3lrj4ps7zo1fq.cloudfront.net/480x480/abc.jpg
//https://d3lrj4ps7zo1fq.cloudfront.net/1000x1000/filters:rotate(90)/abc.jpg
//https://d3lrj4ps7zo1fq.cloudfront.net/1000x1000/filters:quality(40)/abc.jpg
//https://d3lrj4ps7zo1fq.cloudfront.net/200x200/filters:quality(5)/abc.jpg

//https://docs.aws.amazon.com/en_pv/solutions/latest/serverless-image-handler/appendix-d.html