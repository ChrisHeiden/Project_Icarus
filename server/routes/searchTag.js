module.exports = function() {
    this.tag = 'climateChange';

    this.getTag = () => {
        return this.tag;
    },

    this.setTag = (newtag) =>{
        this.tag = newtag;
    }  
}

