import { Input, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const SearchAddress = ({ map, updateMarker }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState();

  const onSearch = async (value) => {
    let url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let token = "e203e66a8462578845613e30850ed2ae2d1fd58d";

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: value }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result = {}) => {
        const { suggestions = [] } = result;
        const data = suggestions.map((item = {}) => {
          const { value, data: d = {} } = item;
          const { geo_lat, geo_lon } = d;

          const lng = parseFloat(geo_lon);
          const lat = parseFloat(geo_lat);

          return { value, lng, lat };
        });

        setSearchResults(data);
      })
      .catch((error) => console.log("error", error));
  };

  const onSelect = (value) => {
    // Find the selected result in the searchResults array
    const selectedResult = searchResults.find(
      (result) => result.value === value
    );

    if (selectedResult) {
      const { lng, lat } = selectedResult;

      if (lng && lat) {
        map.flyTo({
          center: [lng, lat],
          zoom: 14,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });

        updateMarker(lng, lat);

        // Clear the query and search results
        setQuery(selectedResult.value);
        setSearchResults([]);
      }
    }
  };

  return (
    <div>
      <Select
        style={{
          left: "10px",
          top: "10px",
          minWidth: "400px",
          maxWidth: "400px",
          position: "absolute",
          zIndex: 10,
        }}
        showSearch
        value={query}
        placeholder="Введите адрес для поиска"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={onSearch}
        onSelect={onSelect}
      >
        {searchResults.map((result) => (
          <Option key={result.value} value={result.value}>
            {result.value}
          </Option>
        ))}
      </Select>

      {/* searchResults.map((result) => (
        <div
          key={result.id}
          onClick={() => onSearchResultClick(result.lng, result.lat)}
        >
          {result.address}
        </div>
      )) */}
    </div>
  );
};

export default SearchAddress;
