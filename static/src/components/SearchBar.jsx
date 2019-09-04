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
            value: ""
        }
        this.onAddition = this.onAddition.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.swapPage = this.swapPage.bind(this)
        this.setVisitor = this.setVisitor.bind(this)
    }

    onDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
        this.props.removeSearch(this.state.tags[i].id)
    }
    
    onAddition(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
        this.props.putSearch(tag.id)
    }

    swapPage(){
        if(this.props.currentPage !== "/gallery/"){
            this.setState({swapPage: true})
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

    setVisitor(e){
        this.setState({value: e.name})
    }

    render(){

        const {tags} = this.props
        var suggestions = tags ? tags.map(el => {return {
            id: el.id, name: el.value
        }}) : []

        if(this.state.swapPage){
            this.setState({swapPage: false})
            return <Redirect to="/gallery" />
        }

        return (
            <Container>
                <FormGroup>
                    <Autocomplete
                    items={suggestions}
                    getItemValue={(item) => item.name}
                    renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.name}
                    </div>
                    }
                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderInput={(props) => 
                    <input className={"form-control"} name="name" placeholder="Buscar por metadata" {...props} />}
                    wrapperStyle={{width: "80%", display: "inline-block"}}
                    value={this.state.value}
                    onChange={(e) => this.setVisitor({name: e.target.value})}
                    onSelect={(val, item) => {
                    this.setVisitor({name: val, id: item._id})}
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
        emdedSearchTerm: term => {
            return dispatch(search.actionTocall(term));
        },
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
        },
        removeSearch: (id) => {
            return dispatch(search.removeSearchItem(id));
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(SearchBar);