import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
from time_series_model import NewsRelevanceModel
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class NewsAnalyzerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("News Relevance Analyzer")
        self.root.geometry("900x700")
        
        self.model = NewsRelevanceModel()
        
        # Try to load data
        try:
            self.news_data = self.model.load_data('Southwest_news.csv')
            print(f"Loaded {len(self.news_data)} news articles")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load news data: {str(e)}")
            self.news_data = None
        
        self.create_widgets()
    
    def create_widgets(self):
        # Frame for user inputs
        input_frame = ttk.LabelFrame(self.root, text="Company Profile")
        input_frame.pack(fill="x", padx=10, pady=10)
        
        # Company name input
        ttk.Label(input_frame, text="Company Name:").grid(row=0, column=0, padx=5, pady=5, sticky="w")
        self.company_name_var = tk.StringVar(value="Southwest Airlines")
        company_name_entry = ttk.Entry(input_frame, textvariable=self.company_name_var, width=50)
        company_name_entry.grid(row=0, column=1, padx=5, pady=5, sticky="we")
        
        # Company description input
        ttk.Label(input_frame, text="Company Description:").grid(row=1, column=0, padx=5, pady=5, sticky="w")
        self.company_desc_var = tk.StringVar(value="A major American airline based in Dallas, Texas")
        company_desc_entry = ttk.Entry(input_frame, textvariable=self.company_desc_var, width=50)
        company_desc_entry.grid(row=1, column=1, padx=5, pady=5, sticky="we")
        
        # Products/Services input
        ttk.Label(input_frame, text="Products/Services:").grid(row=2, column=0, padx=5, pady=5, sticky="w")
        self.products_var = tk.StringVar(value="Passenger air transportation, cargo services")
        products_entry = ttk.Entry(input_frame, textvariable=self.products_var, width=50)
        products_entry.grid(row=2, column=1, padx=5, pady=5, sticky="we")
        
        # Analyze button
        analyze_btn = ttk.Button(input_frame, text="Analyze", command=self.analyze_news)
        analyze_btn.grid(row=2, column=2, padx=5, pady=5)
        
        # Frame for results
        self.results_frame = ttk.LabelFrame(self.root, text="Top Relevant Articles")
        self.results_frame.pack(fill="both", expand=True, padx=10, pady=10)
        
        # Create a notebook for tabs
        self.notebook = ttk.Notebook(self.results_frame)
        self.notebook.pack(fill="both", expand=True)
        
        # Articles tab
        self.articles_frame = ttk.Frame(self.notebook)
        self.notebook.add(self.articles_frame, text="Articles")
        
        # Trend tab
        self.trend_frame = ttk.Frame(self.notebook)
        self.notebook.add(self.trend_frame, text="Relevance Trend")
        
        # Status bar
        self.status_var = tk.StringVar()
        status_bar = ttk.Label(self.root, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.pack(side=tk.BOTTOM, fill=tk.X)
        
        if self.news_data is not None:
            self.status_var.set(f"Ready. {len(self.news_data)} articles loaded.")
        else:
            self.status_var.set("Error loading news data.")
    
    def analyze_news(self):
        if self.news_data is None:
            messagebox.showerror("Error", "No news data available for analysis.")
            return
        
        # Get user profile
        company_name = self.company_name_var.get().strip()
        company_desc = self.company_desc_var.get().strip()
        products = self.products_var.get().strip()
        
        if not company_name:
            messagebox.showwarning("Warning", "Please enter a company name.")
            return
        
        user_profile = {
            'company_name': company_name,
            'company_description': company_desc,
            'products_services': products
        }
        
        # Update status
        self.status_var.set("Calculating relevance scores...")
        self.root.update_idletasks()
        
        # Calculate relevance
        try:
            self.model.calculate_relevance(user_profile)
            top_articles = self.model.get_top_articles(5)
            
            # Clear previous results
            for widget in self.articles_frame.winfo_children():
                widget.destroy()
            
            # Display top articles
            for i, (_, article) in enumerate(top_articles.iterrows(), 1):
                article_frame = ttk.Frame(self.articles_frame)
                article_frame.pack(fill="x", padx=5, pady=5)
                
                title_label = ttk.Label(
                    article_frame, 
                    text=f"{i}. {article['title']}", 
                    font=("TkDefaultFont", 10, "bold"),
                    wraplength=800
                )
                title_label.pack(anchor="w")
                
                date_label = ttk.Label(
                    article_frame,
                    text=f"Published: {article['publication_date'].strftime('%Y-%m-%d')} | Relevance: {article['relevance_score']:.2f}"
                )
                date_label.pack(anchor="w")
                
                desc_label = ttk.Label(
                    article_frame,
                    text=f"{article['description'][:200]}...",
                    wraplength=800
                )
                desc_label.pack(anchor="w")
                
                ttk.Separator(article_frame, orient="horizontal").pack(fill="x", pady=5)
            
            # Fit time series model and plot trend
            self.status_var.set("Generating relevance trend...")
            self.root.update_idletasks()
            
            self.model.fit_time_series_model()
            forecast = self.model.forecast_relevance(periods=30)
            
            # Clear previous plot
            for widget in self.trend_frame.winfo_children():
                widget.destroy()
            
            # Create new plot
            fig = self.model.plot_relevance_trend(forecast)
            canvas = FigureCanvasTkAgg(fig, master=self.trend_frame)
            canvas.draw()
            canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
            
            self.status_var.set(f"Analysis complete. Found {len(top_articles)} relevant articles.")
            
        except Exception as e:
            messagebox.showerror("Error", f"Analysis failed: {str(e)}")
            self.status_var.set("Analysis failed.")

def main():
    root = tk.Tk()
    app = NewsAnalyzerApp(root)
    root.mainloop()

if __name__ == "__main__":
    main() 