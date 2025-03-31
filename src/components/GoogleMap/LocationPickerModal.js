import LocationPicker from "location-picker";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { geocode, RequestType, setDefaults } from "react-geocode";
import Script from "react-load-script";

function LocationPickerModal(props) {
	const [location, updateLocation] = useState("");
	const [address1, setAddress] = useState("");
	const [city1, setCity] = useState("");
	setDefaults({
		key: "AIzaSyC31YuevmjHGncfKCPbzDOx-9X9Cm2Yy5g", // Your API key here.
		language: "en", // Default language for responses.
		region: "km", // Default region for responses.
	});
	const example = () => {
		var locationPicker = new LocationPicker(
			"map",
			{
				lat: "11.5564",
				lng: "104.9282"
			},
			{
				zoom: 15, // You can set any google map options here, zoom defaults to 15
			},
		);
		
		google.maps.event.addListener(locationPicker.map, "idle", function (event) {
			// Get current location and show it in HTML
			var location = locationPicker.getMarkerPosition();
			console.log("The chosen location is " + location.lat + "," + location.lng);
			console.log(location);
			updateLocation(location.lat + ", " + location.lng);

			geocode(RequestType.LATLNG, `${location.lat},${location.lng}`, {
				location_type: "ROOFTOP", // Override location type filter for this request.
				enable_address_descriptor: true, // Include address descriptor in response.
			})
				.then(({ results }) => {
					console.log(results);
					const address = results[0].formatted_address;
					const { street, khan, city, country } = results[0].address_components.reduce((acc, component) => {
						if (component.types.includes("route")) acc.street = component.long_name;
						else if (component.types.includes("administrative_area_level_2")) acc.khan = component.long_name;
						else if (component.types.includes("administrative_area_level_1")) acc.city = component.long_name;
						else if (component.types.includes("country")) acc.country = component.long_name;
						return acc;
					}, {});
					console.log(street, khan, city, country);
					console.log(address);
					setAddress(`${street||""}${street?", ":""}${khan}, ${city}, ${country}`);
					setCity(city);
				})
				.catch(console.error);
		});
	};

	const handleSelectLocation = () => {
		console.log(address1);
		props.onSelectLocation({address: address1, location: location, city: city1});
		props.onHide();
	}

	return (
		<Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
			<Script
				url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC31YuevmjHGncfKCPbzDOx-9X9Cm2Yy5g`}
				onCreate={() => console.log("onCreate")}
				onError={() => console.log("onError")}
				onLoad={example}
			/>
			<Modal.Header closeButton style={{ width: "100%" }}>
				<Modal.Title id="contained-modal-title-vcenter">
					<p style={{ margin: 0, textAlign: "center" }}>Location Picker</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className="mb-3">
					<Form.Control placeholder="Location" aria-describedby="basic-addon2" readOnly value={address1} />
					<Button variant="outline-secondary" id="button-addon2" onClick={() => handleSelectLocation()}>
						Pick
					</Button>
				</InputGroup>
				<div id="map" style={{ height: "65vh", marginBottom: 0 }} />
			</Modal.Body>
		</Modal>
	);
}

export default LocationPickerModal;
