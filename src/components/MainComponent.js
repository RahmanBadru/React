import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import {Switch , Route , Redirect , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment , fetchDishes} from '../redux/ActionCreators';






const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId , rating , author, comment) => dispatch(addComment(dishId, rating , author , comment)),
  fetchDishes: () => { dispatch(fetchDishes())}
});

class Main extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }
  render(){  
    const Homepage = () => {
      return(
        <Home
          dish={this.props.dishes.dishes.filter((dish) =>dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess} 
          promotion={this.props.promotions.filter((promo) =>promo.featured)[0]} 
          leader={this.props.leaders.filter((leader) =>leader.featured)[0]} 
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess ={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId, 10))} 
          addComment={this.props.addComment}/>
      );
    };
    

    return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={Homepage}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/contactus" component={Contact} />
        <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
    );
  }
}
  


export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Main));
