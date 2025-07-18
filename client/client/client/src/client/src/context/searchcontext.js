import React, { createContext, useContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
  searches: [],
  currentResults: null,
  loading: false,
  error: null,
  searchHistory: JSON.parse(localStorage.getItem('osint-search-history') || '[]'),
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_RESULTS':
      return { 
        ...state, 
        currentResults: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'ADD_TO_HISTORY':
      const newHistory = [action.payload, ...state.searchHistory.slice(0, 49)];
      localStorage.setItem('osint-search-history', JSON.stringify(newHistory));
      return { 
        ...state, 
        searchHistory: newHistory 
      };
    
    case 'CLEAR_HISTORY':
      localStorage.removeItem('osint-search-history');
      return { 
        ...state, 
        searchHistory: [] 
      };
    
    case 'CLEAR_RESULTS':
      return { 
        ...state, 
        currentResults: null, 
        error: null 
      };
    
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const performSearch = async (searchType, searchData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch(`/api/search/${searchType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const results = await response.json();
      
      dispatch({ type: 'SET_RESULTS', payload: results });
      
      // Add to history
      dispatch({ 
        type: 'ADD_TO_HISTORY', 
        payload: {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          type: searchType,
          query: searchData,
          resultCount: results.data?.length || 0,
        }
      });

      return results;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const clearResults = () => {
    dispatch({ type: 'CLEAR_RESULTS' });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  return (
    <SearchContext.Provider value={{
      ...state,
      performSearch,
      clearResults,
      clearHistory,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
