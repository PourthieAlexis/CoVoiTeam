import { apiDataGouv } from "../api/backend/api.Backend";
import { URL_API_GOUV } from "../constants/urls/urlBackEnd";

export const getSuggestions = async (query) => {
    try {
      const response = await apiDataGouv.get(`${URL_API_GOUV}${query}`);
      const data = response.data;
      return data.features;
    } catch (error) {
      return [];
    }
  };
  
  export const handleAddressChange = async (query, setSelectedAddress, setSuggestions) => {
    setSelectedAddress(query);
    try {
      const response = await apiDataGouv.get(`${URL_API_GOUV}${query}`);
      const data = response.data;
      setSuggestions(data.features);
    } catch (error) {
      setSuggestions([]);
    }
  };
  
  export const handleAddressClick = (selectedLabel, suggestions, setSelectedSuggestion, setSelectedAddress, setSuggestions) => {
    const selectedSuggestion = suggestions.find(suggestion => suggestion.properties.label === selectedLabel);
    if (selectedSuggestion) {
      setSelectedSuggestion(selectedSuggestion);
      setSelectedAddress(selectedSuggestion.properties.label);
      setSuggestions([]);
    } else {
    }
  };