const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((acc,blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {

    let maxLikes = 0;
    let pos;
    for(let n = 0; n < blogs.length; n++){

        let blog = blogs[n];
        if(blog.likes > maxLikes){
            maxLikes = blog.likes;
            pos = n;
        }
    }

    return (pos != null) ? blogs[pos] : null; 
    //return pos;
};

module.exports = {
    dummy, totalLikes, favoriteBlog
};
