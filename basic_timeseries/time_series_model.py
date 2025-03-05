import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np
import statsmodels.api as sm
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Download necessary NLTK resources
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
    nltk.data.find('corpora/wordnet')
    try:
        nltk.data.find('corpora/omw-1.4')
    except LookupError:
        nltk.download('omw-1.4')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('wordnet')
    nltk.download('omw-1.4')

class NewsRelevanceModel:
    def __init__(self):
        """Initialize the news relevance model."""
        self.news_data = None
        self.relevance_scores = None
        self.time_series_model = None
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.lemmatizer = WordNetLemmatizer()
        
    def load_data(self, file_path):
        """Load news data from CSV file."""
        self.news_data = pd.read_csv(file_path)
        
        # Check if we need to rename the date column
        if 'publishedAt' in self.news_data.columns and 'publication_date' not in self.news_data.columns:
            self.news_data['publication_date'] = pd.to_datetime(self.news_data['publishedAt']).dt.tz_localize(None)
        else:
            # Original code for backward compatibility
            self.news_data['publication_date'] = pd.to_datetime(self.news_data['publication_date']).dt.tz_localize(None)
        
        # Preprocess the text content for NLP analysis
        self.news_data['processed_content'] = self.news_data.apply(
            lambda row: self._preprocess_text(
                str(row['title']) + " " + str(row['description']) + " " + str(row.get('content', ''))
            ), 
            axis=1
        )
        
        return self.news_data
    
    def _preprocess_text(self, text):
        """Preprocess text for NLP analysis."""
        # Convert to lowercase
        text = text.lower()
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and lemmatize
        stop_words = set(stopwords.words('english'))
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens if token.isalnum() and token not in stop_words]
        
        return " ".join(tokens)
    
    def calculate_relevance(self, user_profile):
        """
        Calculate relevance scores based on user profile.
        
        Args:
            user_profile (dict): Dictionary containing user company information
                                 e.g., {
                                     'company_name': 'Southwest Airlines',
                                     'company_description': 'A major American airline based in Dallas, Texas',
                                     'products_services': 'Passenger air transportation, cargo services'
                                 }
        """
        if self.news_data is None:
            raise ValueError("News data not loaded. Call load_data() first.")
        
        # Initialize relevance score column if it doesn't exist
        if 'relevance_score' not in self.news_data.columns:
            self.news_data['relevance_score'] = 0.0
        
        # Create a profile document by combining all user profile information
        profile_text = f"{user_profile.get('company_name', '')} {user_profile.get('company_description', '')} {user_profile.get('products_services', '')}"
        processed_profile = self._preprocess_text(profile_text)
        
        # Create a corpus with the profile and all news articles
        corpus = [processed_profile] + self.news_data['processed_content'].tolist()
        
        # Vectorize the corpus using TF-IDF
        tfidf_matrix = self.vectorizer.fit_transform(corpus)
        
        # Calculate cosine similarity between profile and each article
        profile_vector = tfidf_matrix[0]
        article_vectors = tfidf_matrix[1:]
        similarities = cosine_similarity(profile_vector, article_vectors).flatten()
        
        # Assign similarity scores as relevance scores
        self.news_data['relevance_score'] = similarities
        
        # Add sentiment bonus if available
        if 'sentiment' in self.news_data.columns:
            for idx, row in self.news_data.iterrows():
                if not pd.isna(row['sentiment']):
                    try:
                        sentiment = float(row['sentiment'])
                        # Positive sentiment adds a small bonus
                        if sentiment > 0:
                            self.news_data.at[idx, 'relevance_score'] += 0.1 * sentiment
                    except (ValueError, TypeError):
                        pass
        
        # Create time series data
        self.relevance_scores = self.news_data[['publication_date', 'relevance_score']].copy()
        self.relevance_scores = self.relevance_scores.sort_values('publication_date')
        
        return self.relevance_scores
    
    def get_top_articles(self, n=5):
        """Get the top n most relevant articles."""
        if self.news_data is None or 'relevance_score' not in self.news_data.columns:
            raise ValueError("Relevance scores not calculated. Call calculate_relevance() first.")
        
        top_articles = self.news_data.sort_values(by='relevance_score', ascending=False).head(n)
        return top_articles
    
    def fit_time_series_model(self):
        """Fit time series model to relevance scores over time."""
        if self.relevance_scores is None:
            raise ValueError("Relevance scores not calculated. Call calculate_relevance() first.")
        
        # Prepare data for time series analysis
        # Group by date and calculate average relevance score for each day
        daily_scores = self.relevance_scores.groupby(self.relevance_scores['publication_date'].dt.date)['relevance_score'].mean()
        daily_scores = daily_scores.reset_index()
        daily_scores['publication_date'] = pd.to_datetime(daily_scores['publication_date'])
        daily_scores = daily_scores.set_index('publication_date')
        
        # Fill missing dates with forward fill
        idx = pd.date_range(daily_scores.index.min(), daily_scores.index.max())
        daily_scores = daily_scores.reindex(idx, fill_value=None)
        daily_scores = daily_scores.fillna(method='ffill')
        
        # Store the prepared data
        self.time_series_data = daily_scores
        
        # Try exponential smoothing with trend
        model = ExponentialSmoothing(daily_scores, trend='add', seasonal=None)
        self.time_series_model = model.fit()
        
        return self.time_series_data
    
    def forecast_relevance(self, periods=30):
        """Forecast relevance scores for future periods."""
        if not hasattr(self, 'time_series_data'):
            raise ValueError("Time series model not fitted. Call fit_time_series_model() first.")
        
        # Create future dates
        last_date = self.time_series_data.index[-1]
        future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=periods)
        
        # Create forecast dataframe with combined index
        all_dates = self.time_series_data.index.union(future_dates)
        forecast = pd.DataFrame(index=all_dates)
        
        # Add actual values
        forecast['actual'] = np.nan
        forecast.loc[self.time_series_data.index, 'actual'] = self.time_series_data['relevance_score']
        
        # Generate forecast
        forecast['forecast'] = np.nan
        
        if self.time_series_model is not None:
            try:
                # Add historical fitted values
                forecast.loc[self.time_series_data.index, 'forecast'] = self.time_series_model.fittedvalues
                
                # Add future forecast values
                future_forecast = self.time_series_model.forecast(steps=periods)
                forecast.loc[future_dates, 'forecast'] = future_forecast.values
            except Exception as e:
                print(f"Warning: Forecast failed: {str(e)}")
                # Fallback to last value
                forecast.loc[self.time_series_data.index, 'forecast'] = self.time_series_data['relevance_score']
                forecast.loc[future_dates, 'forecast'] = self.time_series_data['relevance_score'].iloc[-1]
        
        return forecast
    
    def plot_relevance_trend(self, forecast=None):
        """Plot the trend of relevance scores over time."""
        if not hasattr(self, 'time_series_data'):
            raise ValueError("Time series model not fitted. Call fit_time_series_model() first.")
        
        if forecast is None:
            forecast = self.forecast_relevance()
        
        # Create figure
        fig, ax = plt.subplots(figsize=(10, 6))
        
        # Plot actual values
        ax.scatter(forecast.index[~forecast['actual'].isna()], 
                  forecast['actual'][~forecast['actual'].isna()], 
                  color='blue', alpha=0.5, label='Actual')
        
        # Plot forecast
        ax.plot(forecast.index, forecast['forecast'], color='red', label='Forecast')
        
        # Add vertical line to separate historical data from forecast
        last_historical_date = self.time_series_data.index[-1]
        ax.axvline(x=last_historical_date, color='green', linestyle='--', label='Forecast Start')
        
        # Add labels and legend
        ax.set_title('News Relevance Trend Over Time')
        ax.set_ylabel('Relevance Score')
        ax.set_xlabel('Date')
        ax.legend()
        
        return fig
    
    def display_top_articles(self, n=5):
        """Display the top n most relevant articles in a readable format."""
        top_articles = self.get_top_articles(n)
        
        print(f"\nTop {n} Most Relevant Articles:")
        print("=" * 80)
        
        for i, (_, article) in enumerate(top_articles.iterrows(), 1):
            print(f"{i}. {article['title']}")
            print(f"   Published: {article['publication_date'].strftime('%Y-%m-%d')}")
            print(f"   Relevance Score: {article['relevance_score']:.2f}")
            print(f"   {article['description'][:150]}...")
            print("-" * 80)
        
        return top_articles

