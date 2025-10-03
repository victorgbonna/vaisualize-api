module.exports = async function (data){
    if (process.env.NODE_ENV === 'production') return;
    console.log('development console')
    console.log(data);
    return
}