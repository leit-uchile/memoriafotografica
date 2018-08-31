import React, {Component} from 'react';

class Upload extends Component{
    constructor(Props){
        super(Props);
        this.state = {
            errors: null,
            name: "",
            description: "",
            image: ""
        };   
    }

   updatename = a => {this.setState({name : a.target.value})}
   updatedescription = a =>{this.setState({description : a.target.value})}
   updateimage = a =>{this.setState({image : a.target.value})}

onSubmit = a => {
    a.preventDefault();
    this.props.Upload(this.state.name,this.state.description,this.state.image);
}
    
    anError(){
        console.log("Llame error");
        this.setState({errors: "Un error"});
    }

    render() {
        var message;
        if (this.state.errors != null){
            message = <div>{this.state.errors}</div>
        } else {
            message = null;
        }


        return(
        <div>
            {message}
            <form enctype="multipart/form-data" method="POST" onSubmit={this.onSubmit}>

                    <input type="file"  name="photo" onChange={this.updateimage}/>
                <label>
                    Título
                    <input type="text" onChange={this.updatename} name="name"/>
                </label>

                <label>
                    Descripción
                     <textarea name="description" onChange={this.updatedescription}> </textarea>
                </label>    
                
                <label>
                    Envia
                    <input type="submit" value="SEND" className="submit" /> 
                </label>
            </form>  
            <button onClick={this.anError.bind(this)}>Error</button>
        </div>
         )
    }
}

export default Upload;