export const getLastItemInPath = (path: string) => {
    const segments = path.split('/');
    if(segments[segments.length - 1] === "index.html"){
        segments.pop();
    }
    return segments[segments.length - 1];
};

export const getLocalPathOrDefaultExternal = (path: string) => {
    if(!path.startsWith("/")){
        return path;
    }
    const segments = path.split('/');
    if(segments[segments.length - 1] === "index.html"){
        segments.pop();
    }
    return segments[segments.length - 1];
};