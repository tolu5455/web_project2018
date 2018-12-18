import React, { Component } from 'react';
import NavBar from './NavBar';
import { Navbar, Row, Col } from 'react-bootstrap';
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { updateCoverImage } from '../actions/updateCoverImage';
import { updateTab } from '../actions/updateTab';
import { bindActionCreators } from 'redux';
import { updateComponent } from '../actions/updateComponent';
import { Redirect } from 'react-router-dom';
import { updateSCKey } from '../actions/updateSCKey';
class Following extends Component {
  render() {
    return (
      this.props.sckey == null ? <Redirect to="/login"></Redirect> :
      this.props.component === "post" ? <Redirect to="/"></Redirect> :
      this.props.component === "followers" ? <Redirect to="/followers"></Redirect> :
      this.props.component === "editprofile" ? <Redirect to="/editprofile"></Redirect> :
        <div class="content">
          <div>
            <div class="cover-div">
              <img class="cover-image"
                src={this.props.coverImage.cover}
              />
            </div>
            <NavBar component={this.props.component} tab={this.props.tab} onUpdateTab={this.props.onUpdateTab} onUpdateComponent={this.props.onUpdateComponent} />


            <Col xs={6} md={3}>
              <div class="col-space user-info">
                <p> Name: ABC</p>
                <p> Age: 20</p>
                <p> Phone: 123456</p>
              </div>
            </Col>

            <Col xs={6} md={8}>
              <div class="follow-list">
                <Row>

                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Bill Gate</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">follow</button>

                        </Col>
                        <Col Col xs={6} md={2}>
                          <i class="fa ellipsis-icon">&#xf142;</i>
                        </Col>
                      </Row>
                    </div>
                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Bill Gate</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">follow</button>

                        </Col>
                        <Col Col xs={6} md={2}>
                          <i class="fa ellipsis-icon">&#xf142;</i>
                        </Col>
                      </Row>
                    </div>

                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Bill Gate</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">follow</button>

                        </Col>
                        <Col Col xs={6} md={2}>
                          <i class="fa ellipsis-icon">&#xf142;</i>
                        </Col>
                      </Row>
                    </div>

                  </Col>
                </Row>


                <Row>

                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Bill Gate</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">follow</button>

                        </Col>
                        <Col Col xs={6} md={2}>
                          <i class="fa ellipsis-icon">&#xf142;</i>
                        </Col>
                      </Row>
                    </div>
                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Bill Gate</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">follow</button>

                        </Col>
                        <Col Col xs={6} md={2}>
                          <i class="fa ellipsis-icon">&#xf142;</i>
                        </Col>
                      </Row>
                    </div>

                  </Col>



                  <Col Col xs={6} md={4}>
                    <div class="follow-li ">
                      <div class="cover-div-small">
                        <img class="cover-image"
                          src={this.props.coverImage.cover}
                        />
                      </div>
                      <Row>
                        <Col Col xs={6} md={5}>

                          <div class="navbar-brand">
                            <img class="user-profile-small" src="https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg" />
                          </div>

                          <div class="follow-name">
                            <a> Bill Gate</a>
                          </div>
                        </Col>
                        <Col Col xs={6} md={4}>
                          <button type="submit" class="button-follow">follow</button>

                        </Col>
                        <Col Col xs={6} md={2}>
                          <i class="fa ellipsis-icon">&#xf142;</i>
                        </Col>
                      </Row>
                    </div>

                  </Col>
                </Row>












              </div>
            </Col>






          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    coverImage: state.coverImage,
    tab: state.tab,
    component: state.component,
    sckey: state.sckey,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onUpdateCoverImage: updateCoverImage,
    onUpdateTab: updateTab,
    onUpdateComponent: updateComponent,
    onUpdateSCKey: updateSCKey,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Following);