import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import axios from 'axios'

import "react-big-calendar/lib/css/react-big-calendar.css";
// import googleAPI from  "./utils/googleAPI"


moment.locale('ko', {
  week: {
      dow: 1,
      doy: 1,
  },
});

const localizer = momentLocalizer(moment);

class MyCal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      events: []
    };
  
  }
  componentDidMount = () => {
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.events) !== JSON.stringify(this.state.events)) {
      this.setState({events: nextProps.events});
    }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    const {email} = this.props;
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });

      axios
      .post('http://localhost:3000/events', {
        email,
        event: {
          summary: title,
          start: {dateTime: start},
          end: {dateTime: end}
        }
      }).then((result) => {
        const {data} = result;
        console.log(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          timeslots={2}
          views={{
            week: true
          }}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

export default MyCal;