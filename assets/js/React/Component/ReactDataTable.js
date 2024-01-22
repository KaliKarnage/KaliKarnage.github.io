(() => {
  const Filters = (props) => {
    const updateWeaponHand = (clickEvent) => {
      props.updateFormState({ weaponHand: clickEvent.target.value });
    };
  
    const updateWeaponType = (clickEvent) => {
      props.updateFormState({ weaponType: clickEvent.target.value });
    };
  
    const updateDPS = (clickEvent) => {
      props.updateFormState({ dpsOrder: clickEvent.target.value });
    };
  
    const updateSearchQuery = (clickEvent) => {
      props.updateFormState({ searchQuery: clickEvent.target.value });
    };
  
    return (
      <div className="container">
        <p><b>Filter your data:</b></p>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="weapon">Choose a Weapon Type: </label>
            <select id="weapon" onChange={updateWeaponType}>
              <option value="">All</option>
              <option value="Axe">Axe</option>
              <option value="Bow">Bow</option>
              <option value="Crossbow">Crossbow</option>
              <option value="Dagger">Dagger</option>
              <option value="Fishing Pole">Fishing Pole</option>
              <option value="Fist Weapon">Fist Weapon</option>
              <option value="Gun">Gun</option>
              <option value="Mace">Mace</option>
              <option value="Polearm">Polearm</option>
              <option value="Staff">Staff</option>
              <option value="Sword">Sword</option>
              <option value="Thrown">Thrown</option>
              <option value="Wand">Wand</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="hand">Select Weapon Hand: </label>
            <select id="hand" onChange={updateWeaponHand}>
              <option value="">All</option>
              <option value="Two-Hand">Two-Hand</option>
              <option value="One-Hand">One-Hand</option>
              <option value="Ranged">Ranged</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="dps">Sort by DPS: </label>
            <select id="dps" onChange={updateDPS}>
              <option value="">None</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="search">Search by Name:</label>
            <input type="text" id="search" className="form-control" placeholder="Search..." onChange={updateSearchQuery} />
          </div>
        </div>
      </div>
    );
  };
  
  const DataTable = (props) => {
    return (
      <div className="table-responsive">
        <table className="table">
          <tbody>
          <tr>
              <th>Weapon Name</th>
              <th>Item Level</th>
              <th>Weapon Hand</th>
              <th>Weapon Type</th>
              <th>Damage Low</th>
              <th>Damage High</th>
              <th>DPS</th>
              <th>Gold Sell</th>
              <th>Silver Sell</th>
              <th>Copper Sell</th>
            </tr>
            {props.dataToDisplay.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.itemLevel}</td>
                <td>{row.hand}</td>
                <td>{row.type}</td>
                <td>{row.damageLow}</td>
                <td>{row.damageHigh}</td>
                <td>{row.dps}</td>
                <td>{row.sellPriceGold}</td>
                <td>{row.sellPriceSilver}</td>
                <td>{row.sellPriceCopper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  class ReactDataTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        weaponHand: "",
        weaponType: "",
        dpsOrder: "",
        filteredData: [],
        searchQuery: "",
      };
      this.updateFormState = this.updateFormState.bind(this);
    }
  
    componentDidMount() {
      fetch("tableData.json")
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.text();
        })
        .then(text => {
          const jsonData = JSON.parse(text);
          this.originalData = jsonData;
          this.setState({ filteredData: jsonData });
        })
        .catch(error => console.error("Error fetching or parsing data:", error));
    }
  
    updateFormState(specification) {
      this.setState(specification, this.sortData);
    }
  
    sortData() {
      let sortedData = [...this.originalData];
      if (this.state.weaponType) sortedData = sortedData.filter(item => item.type === this.state.weaponType);
      if (this.state.weaponHand) sortedData = sortedData.filter(item => item.hand === this.state.weaponHand);
      if (this.state.dpsOrder) sortedData.sort((a, b) => (this.state.dpsOrder === "low-to-high" ? parseFloat(a.dps) - parseFloat(b.dps) : parseFloat(b.dps) - parseFloat(a.dps)));
      if (this.state.searchQuery) sortedData = sortedData.filter(item => item.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()));
      this.setState({ filteredData: sortedData });
    }
  
    render() {
      return (
        <>
          <Filters updateFormState={this.updateFormState} />
          <hr />
          <DataTable dataToDisplay={this.state.filteredData} />
        </>
      );
    }
  }
  
  const container = document.getElementById("react-data-table");
  ReactDOM.createRoot(container).render(<ReactDataTable />);
})();
