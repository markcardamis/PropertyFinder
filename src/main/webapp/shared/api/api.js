export const listSavedFilters = async () => { 
        try {
        const response = await fetch('/api/notifications', {
        headers: {
            Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
    });
    const data = await response.json();
    console.dir({ data });
    console.log('successfully loaded list of filters');

    //   this.setState({ notifications : JSON.stringify(data) });
    this.setState({ savedFilters : data });
    } catch (err) {
        console.log('error loading list of filters');
    }
}