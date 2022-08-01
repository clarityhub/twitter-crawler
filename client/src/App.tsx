import React, { Component } from 'react';
import LoadSentiment from './components/LoadSentiment';
import Chart from './components/Chart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Clarity Hub</h1>

        <LoadSentiment
          topic="tesla"
          component={({ data }: any) => {
            if (data.length === 0) {
              return <div>No data</div>;
            }

            return (
              <>
                <h2>Telsa Sentiment</h2>
                <Chart x="date" y="sentimentScoresMean" data={data} />

                <h2>Telsa Toxicity</h2>
                <Chart x="date" y="toxicityPercentage" data={data} />
              </>
            );
          }}
        />

        <LoadSentiment
          topic="amazon"
          component={({ data }: any) => {
            if (data.length === 0) {
              return <div>No data</div>;
            }

            return (
              <>
                <h2>Amazon Sentiment</h2>
                <Chart x="date" y="sentimentScoresMean" data={data} />

                <h2>Amazon Toxicity</h2>
                <Chart x="date" y="toxicityPercentage" data={data} />
              </>
            );
          }}
        />

        <LoadSentiment
          topic="microsoft"
          component={({ data }: any) => {
            if (data.length === 0) {
              return <div>No data</div>;
            }

            return (
              <>
                <h2>Microsoft Sentiment</h2>
                <Chart x="date" y="sentimentScoresMean" data={data} />

                <h2>Microsoft Toxicity</h2>
                <Chart x="date" y="toxicityPercentage" data={data} />
              </>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
