const handleRating = (rating) => {
    let res
    if (rating === 5){
        res = 100
    }else if(rating < 5 & rating >= 4.5){
        res = 90
    }else if(rating < 4.5 & rating >= 4){
        res = 80
    }else if(rating < 4 & rating >= 3.5){
        res = 70
    }else if(rating < 3.5 & rating >= 3){
        res = 60
    }else if(rating < 3 & rating >= 2.5){
        res = 50
    }else if(rating < 2.5 & rating >= 2){
        res = 40
    }else if(rating < 2 & rating >= 1.5){
        res = 30
    }else{
        res = 20
    }
    return res
}

export default handleRating;
