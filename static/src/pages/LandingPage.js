import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {misc} from '../actions';
import {connect} from 'react-redux';
import {
    Media,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';


const items = [
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 1',
      caption: 'Les susanda ecusdae odit inctia dolore, ea conseque expliti ossuntorem rae peris et volland erferei untur, tem am num quos secatio. Um hit et is si offictemqui rem numqui non prae sim que antemporia pra velent.'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 2',
      caption: 'Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient.'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
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
      }
    
      render() {
        const { activeIndex } = this.state;
    
        const slides = items.map((item) => {
          return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
              <img src={item.src} alt={item.altText} />
              <p style={styles.carouselText}>{item.caption}</p>
            </CarouselItem>
          );
        });
    
        return (
          <div>
            <div style={{width: '800px'}}>
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
            <div style={styles.section2}>
              <img src={'facultad.jpeg'} style={{width: '230px', height: '165px'}} />
              <p style={{padding: '5px'}}>
              Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient.
              </p>
            </div>
            <div style={styles.section2}>
              <img src={'facultad.jpeg'} style={{width: '230px', height: '165px'}} />
              <p style={{padding: '5px'}}>
              Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient.
              </p>
            </div>
            <div style={styles.section2}>
              <img src={'facultad.jpeg'} style={{width: '230px', height: '165px'}} />
              <p style={{padding: '5px'}}>
              Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient.
              </p>
            </div>
            
            <Media style={styles.section3}>
              <Media body>
                <Media heading>
                ¿Quieres participar?
                </Media>
                Laborend andipsa ipsam ex es ame vent, te dendelit abo. Destis sunt lant eicab iduntios et facestrum quas que eum sime evenitatem qui id mincti voluptatur ma dem venditestor assincia coris
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
      evelectia autemodis nis similla sunt, apercillabo. Et essim ratem unt ut utaquia turest quis aut am
              </Media>
              <Media right href="#">
                <Media object data-src="facultad.jpeg" alt="Facultad de Ciencias Físicas y Matemáticas" />
              </Media>
            </Media>
          </div>
        );
      }
}

const styles = {
  carouselText: {
    width: '800px',
    height: '50px',
    backgroundColor: '#ebeeef',
    textAlign: 'justify',
},
  section2: {
    display: 'inline-block',
    margin: '15px',
    width: '230px',
    height: '248px',
    backgroundColor: '#ebeeef',
    textAlign: 'justify',
    fontSize: '15px',
    
},
  section3: {
    
}

}
const mapActionsToProps = dispatch => {
  return {
    setRoute: (route) => {
      return dispatch(misc.setCurrentRoute(route));
    }
  }
}

export default connect(null,mapActionsToProps)(LandingPage);