module.exports  = async function (date){
    const day = date.getDay();
  
    if (day === 2) {
      // If it's Tuesday (day 2), shift to the nearest Wednesday (day 3)
      date.setDate(date.getDate() + 1);
    } else if (day === 5) {
      // If it's Friday (day 5), shift to the nearest Saturday (day 6)
      date.setDate(date.getDate() + 1);
    }
  
    return new Date(date);
}