import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Container, Button, FormGroup} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {search, home, misc} from '../actions';
import Autocomplete from 'react-autocomplete';

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            tags: [],
            swapPage: false,
            value: "",
            id: "",
        }
        this.swapPage = this.swapPage.bind(this)
    }

    swapPage(){
        if(this.props.currentPage !== "/gallery/"){
            this.setState({swapPage: true})
        }
        if(this.state.id !== undefined && this.state.id !== ""){
            this.props.putSearch(this.state.id)
        }
    }

    componentWillMount(){
        console.log(this.props)
        if(this.props.tags === undefined || this.props.tags.length === 0){
            console.log("Get tags")
            this.props.onLoadGetTags()
        }
        if(this.props.iptc === undefined){
            this.props.onLoadGetIPTC()
        }
    }

    render(){

        // TODO: fix unlimited tags on search
        const {tags} = this.props

        if(this.state.swapPage){
            this.setState({swapPage: false})
            return <Redirect to="/gallery" />
        }

        return (
            <Container>
                <FormGroup>
                    <Autocomplete
                    items={tags}
                    getItemValue={(item) => item.value}
                    renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white', padding: "0 0 0 2px"}}>
                        {item.value}
                    </div>
                    }
                    shouldItemRender={(item, value) => item.value.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderInput={(props) => 
                    <input className={"form-control"} name="name" placeholder="Buscar por metadata" {...props} />}
                    wrapperStyle={{width: "80%", display: "inline-block"}}
                    value={this.state.value}
                    onChange={(e) => this.setState({value: e.target.value})}
                    onSelect={(val, item) => {
                        this.setState({value: val, id: item.id})}
                    }
                    />
                    <Button type="button" style={{
                        border: "#FF5A60",
                        backgroundColor: "#FF5A60", 
                        width: "20%", 
                        display: "inline-block",
                        marginBottom: "5px"
                    }} 
                    onClick={this.swapPage} block>Buscar</Button>
                </FormGroup>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        tags: state.home.all_tags,
        iptc: state.home.all_iptc,
        currentPage: state.misc.currentRoute,
    }
}

const mapActionsToProps = dispatch => {
    return {
        onLoadGetPhotos: () => {
            return dispatch(home.home());
        },
        onLoadGetTags: () => {
            return dispatch(home.tags());
        },
        onLoadGetIPTC: () => {
            return dispatch(home.iptcs());
        },
        setRoute: (route) => {
            return dispatch(misc.setCurrentRoute(route));
        },
        putSearch: (id) => {
            return dispatch(search.putSearchItem(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SearchBar);