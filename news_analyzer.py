from time_series_model import NewsRelevanceModel
import matplotlib.pyplot as plt

def main():
    # Initialize the model
    model = NewsRelevanceModel()
    
    # Load the news data
    print("Loading news data...")
    news_data = model.load_data('Southwest_news.csv')
    print(f"Loaded {len(news_data)} news articles")
    
    # Define a user profile
    user_profile = {
        'interests': ['southwest', 'airlines', 'travel', 'weather', 'storm']
    }
    
    # Calculate relevance scores
    print(f"Calculating relevance based on user interests: {', '.join(user_profile['interests'])}")
    model.calculate_relevance(user_profile)
    
    # Display top articles
    model.display_top_articles(5)
    
    # Fit time series model
    print("\nFitting time series model to relevance scores...")
    model.fit_time_series_model()
    
    # Forecast future relevance
    print("Forecasting future relevance...")
    forecast = model.forecast_relevance(periods=30)
    
    # Plot relevance trend
    print("Plotting relevance trend...")
    fig = model.plot_relevance_trend(forecast)
    plt.tight_layout()
    plt.savefig('relevance_trend.png')
    print("Plot saved as 'relevance_trend.png'")
    
    # Show the plot
    plt.show()

if __name__ == "__main__":
    main() 