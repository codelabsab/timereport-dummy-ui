import React, { Component } from "react";
import TableBody from './components/TableBody'
import Form from './components/Form';
import DatePicker from './components/DatePicker';

const user_id = 'U2FGC795G';


class App extends Component {
    constructor(props) {
      super(props)
      this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    state = {
        data: [],
        names: [],
        error: undefined,
        selectedOption: undefined,
    }

    componentDidMount() {
        this.fetchData();
    }

    handleSelectChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption.target.value,
        });
        console.log(`Option selected:`, selectedOption.target.value);
    }

    handleDateChange = (e, p) => {
        var moment = require('moment');
        var startDate = moment(p.startDate.toISOString()).format("YYYY-MM-DD");
        var endDate = moment(p.endDate.toISOString()).format("YYYY-MM-DD");
        this.setState({
            startDate: startDate,
            endDate: endDate
        })

        console.log('it works, startDate: ' + startDate + ' endDate: ' + endDate)
    }

    fetchData = async (e) => {
        const getUserId = await fetch(`https://ywdi37qne9.execute-api.eu-north-1.amazonaws.com/api/user/${user_id}`);
        const getUserNames = await fetch(`https://ywdi37qne9.execute-api.eu-north-1.amazonaws.com/api/user/names`);
        const data = await getUserId.json();
        const names = await getUserNames.json();

        if (data && names) {
            this.setState({
                data: data,
                names: names,
                error: ''
            });
        } else {
            this.setState({
                data: undefined,
                names: undefined,
                error: 'Nothing Found in Database'
            })
        }
    }
    render() {
        return (
            <div className="App">
                <div className="jumbotron">
                    <br></br>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                    <form>
                        <div className='form-row'>

                            <Form
                            names={this.state.names}
                            selectedOption={this.state.selectedOption}
                            handleSelectChange={this.handleSelectChange}
                            />
                            <DatePicker handleDateChange={this.handleDateChange}/>
                        </div> 
                    </form>
                </div>      
                    <TableBody data={this.state.data}/>
            </div>
        );
    }
}

export default App;