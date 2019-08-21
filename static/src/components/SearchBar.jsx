import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {search, home, misc} from '../actions';
import ReactTags from 'react-tag-autocomplete'
import styles from '../css/search.css'

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            tags: [],
            swapPage: false
        }
        this.onAddition = this.onAddition.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.swapPage = this.swapPage.bind(this)
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
        if(this.props.tags === undefined){
            this.props.onLoadGetTags()
        }
        if(this.props.iptc === undefined){
            this.props.onLoadGetIPTC()
        }
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
                <ReactTags
                tags={this.state.tags}
                suggestions={suggestions}
                handleDelete={this.onDelete}
                handleAddition={this.onAddition}
                allowNew={false}
                placeholder={'Buscar por metadata'}
                />
                <Button size="lg" style={{borderRadius: "0 5px 5px 0", border: "#FF5A60",
                backgroundColor: "#FF5A60"}} onClick={this.swapPage}>Buscar</Button>
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