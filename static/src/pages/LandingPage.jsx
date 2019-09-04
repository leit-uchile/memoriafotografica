import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {misc} from '../actions';
import {connect} from 'react-redux';
import {home} from '../actions'
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, Card, Button, CardImg, CardText, CardDeck, CardBody} from 'reactstrap';

const items = [
    {
      src: 'http://postulante.fcfm.uchile.cl/wordpress/wp-content/uploads/2015/12/31.jpg',
      altText: 'Slide 1',
      caption: 'Les susanda ecusdae odit inctia dolore, ea conseque expliti ossuntorem rae peris et volland erferei untur, tem am num quos secatio. Um hit et is si offictemqui rem numqui non prae sim que antemporia pra velent.'
    },
    {
      src: 'http://fundacionmellado.cl/wp-content/uploads/2014/09/DSC_0001.jpg',
      altText: 'Slide 2',
      caption: 'Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient Les susanda ecusdae odit inctia dolore, ea conseque expliti ossuntorem rae peris et volland erferei untur, tem am num quos secatio. Um hit et is si offictemqui rem numqui non prae sim que antemporia pra velent.'
    },
    {
      src:'http://postulante.fcfm.uchile.cl/wordpress/wp-content/uploads/2015/12/IMG_3190.jpg',
      altText: 'Slide 3',
      caption: 'Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient.'
    }
  ];

class LandingPage extends Component{

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
      }
    
      onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }

      componentWillMount(){
        this.props.setRoute('/Inicio');
        this.props.onLoad();
      }
    
      render() {

        if(this.state.selectedPhoto){
          return <Redirect to={this.state.selectedPhoto} />
        }

        const { activeIndex } = this.state;
    
        const slides = items.map((item) => {
          return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
              <img width= '100%' style={{maxHeight:'600px'}} src={item.src} alt={item.altText} />
              <div style={{width: '100%', height: '90px', backgroundColor: '#ebeeef', }}>
                <p style={{textAlign: 'justify', padding: '15px'}}>{item.caption}</p>
              </div>
            </CarouselItem>
          );
        });
        
        const photos = this.props.photos.slice(0,5).map((el) => {
          return (
            <Card>
              <CardImg top src={el.thumbnail} alt="Card image cap" onClick={() => this.setState({selectedPhoto: `/photo/${el.id}`})}/>
              <CardBody style={{backgroundColor:'#ebeeef'}}>
                <CardText>{el.description}</CardText>
              </CardBody>
            </Card>
          );
        });

        return (
          <Container>
            <Helmet>
              <meta property="og:title" content="Memoria fotográfica FCFM"/>
              <meta property="og:type" content="website" />
              <meta property="og:url" content=" http://memoriafotografica.ing.fcfm.cl/" />
              <meta property="og:image" content=" http://example.com/image.jpg" />
              <meta property="og:description" content="Descripcion" />
              <title>Memoria fotogr&aacute;fica FCFM</title>
            </Helmet>
            <Row>
              <div style={{width: "100%", maxWidth:'1024px', margin: "0 auto"}}>
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>                    
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
              </div>
            </Row>
            <Row style={{marginTop: "1em"}}>
              <CardDeck>
                {photos}
              </CardDeck>
            </Row>
            <Row style={{marginTop: "1em"}}>
              <Col>
                <h2 style={{fontSize:'25px'}}>¿Quieres participar?</h2>
                <p style={{textAlign:'justify'}}>Laborend andipsa ipsam ex es ame vent, te dendelit abo. Destis sunt lant eicab iduntios et facestrum quas que eum sime evenitatem qui id mincti voluptatur ma dem venditestor assincia coris
      adit ea sitate earit veligni maximpo renimai onsero maiorep eruntus.
      Pa si si omnimpo rporeri nobist, verovit vero bero et quas eniminum cores maion cus cusdae nobit
      endipit, quundiat ea idem et que nobis endit quossit ectetur aliquiatur? Untur, quatibus.
      Aperore imagnis et poremod quisimpost quam qui simenti beaquiam que non es pore estotatus,
      quid que lam quati odis auda aliquam ut aut autatur, volupis suntis asi accum ipsam fugiatia sincillaut ad que millam, tetus ab ipic totaquo voluptias net poruntem. Mus.
      Dam sum ni nosanda con exces eum quamet, sum experem sintis eum harum si cus, que sam que
      doloria vellabo. Itaquiat rem fuga. Tem harumquis dus earchit incipsandit ipid mo od ullitas millat
      quo magnamenitas estia iunt abor molorendi nonsequissi opta apis ipsam nume volore volupie
      nderum quod maios moluptat lab ipsam, tem fugia consequi dolut quae. Pienist, con nustempos
      eium et ex esto voluptaqui inis accus poreicia deribusam inturitiae. Sit apere dita nonsenderum hit,
      officiur aut quame nobis etur, quassiti voluptaest, cuptatur aut estistor accatur sunt, cus, voluptas
      et molo exceperferum quatem aut ma conet aditi disciae nimus que iscimusapid esequia quis es
      evelectia autemodis nis similla sunt, apercillabo. Et essim ratem unt ut utaquia turest quis aut am</p>
              </Col>
              <Col sm='4'>
              <Card>
                <CardImg top width="100%" src="http://postulante.fcfm.uchile.cl/wordpress/wp-content/uploads/2015/09/bienvenidos_2_v2.jpg" alt="Card image cap" />
                <CardBody style={{backgroundColor:'#ebeeef'}}>
                  <CardText>Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient.</CardText>
                </CardBody>
              </Card>
              </Col>  
            </Row>           
          </Container>
        );
      }
}

const styles = {
  carouselText: {
       

},
  section2: {
    backgroundColor: '#ebeeef',
    fontSize: '15px',    
}}

/* const Gallery = ({photoList}) => (
  <Row>
      {photoList.map((el, index) => (
          <Photo key={index} name={el.title} url={el.image} tags={el.metadata} url2={el.image} height="200px" useLink redirectUrl={`/photo/${el.id}`}/>
      ))}
  </Row>
) */

const mapStateToProps = state => {
  return {
      photos: state.home.photos
  }
}

const mapActionsToProps = dispatch => {
  return {
    onLoad: () => {
      return dispatch(home.home());
  },
    setRoute: (route) => {
      return dispatch(misc.setCurrentRoute(route));
    }
  }
}

export default connect(mapStateToProps,mapActionsToProps)(LandingPage);