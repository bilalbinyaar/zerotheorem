import { Link } from "react-router-dom";
import './FAQ.css';

var link = <Link to='/resources'>resources</Link>;


export const questions = [
    {
        id: 1,
        question: 'What is Zero Theorem?',
        answer: <p className="answers-api">Zero Theorem is an economic framework consisting of state-of-the-art machine learning methods used for an empirical proof on a set of Governing Equations that value digital assets. The resultant output of the proof is a range of forward price estimations (or forecasted directions) for Bitcoin and like proof of work (PoW) crypto-currencies. If you like to dive deep into the math please go to our {link}. </p>
    },
    
    {
        id: 2,
        question: 'How have these models been tested?',
        answer: 'The models have been thoroughly back tested on both seen and unseen data sets. The metrics that are shown on the website are a combination of the back tested results with the inclusion of live data moving forward. Every day new metrics are calculated based on the live performance of the previous day.'
    },

    {
        id: 3,
        question: 'What is Zero Proof Protocol?',
        answer: 'If a pricing theory has true descriptive power its ability to effectively and consistently predict directional movements should be unquestionable with practical consequence. The Zero Proof Protocol is an empirical method of proving pricing models via subjected them to real life market conditions and monitoring their hypothetical trading performance. All models on Zero Theorem are utilising a Zero Proof Protocol in order to validate their legitimacy.'
    },

    {
        id: 4,
        question: 'Are trading fees taken into account with your models?',
        answer: 'No. Trading fees are not taken into account as of yet. There will be a feature in the future which would allow users to observe the impact of trading fees for all individual models.'
    },

    {
        id: 5,
        question: 'Why are their no risk controls (stop loss/take profit) applied to the models?',
        answer: 'Our goal is to prove that models resulting from Zero Theorem governing equations do produce superior foresight and performance without the need of risk control interventions. Risk controls themselves should only enhance a model’s already inherent performance to drive up yield consistency and reduce drawdown intensity and durations.'
    },

    {
        id: 6,
        question: 'What are the accuracy of the models?',
        answer: 'The accuracy of any model can be viewed directly at the bottom of its individual page. Here you will find the specific drawdown, win/loss metrics and general statistics that make up overall performance of a model.'
    },

    {
        id: 7,
        question: 'How do we use Zero Theorem models to make money?',
        answer: 'We do not provide financial or investment advice. Please treat the content of this entire website as an academic exercise to prove the existence of a robust pricing theory for Proof of Work digital currencies.'
    },

    {
        id: 8,
        question: 'Who is SOREZ?',
        answer: 'SOREZ is a pseudonymous group of misbehaving quants responsible for the Zero Theorem infrastructure, the derivation of Zero Theorem governing equations and development of the Zero Theorem machine learning models and solutions. '
    },

    {
        id: 9,
        question: 'What is Quant and what do they do?',
        answer: 'A quant is someone who typically (but not always) holds a PhD in some form of natural sciences, has gotten bored of not being paid properly in their respective discipline and therefore has decided to explore finance. Here a quant uses their huge brain power to model or simulate asset behaviour and/or risk using a range of mathematical and statistical methods. The output of a Quants work is typically utilised in investment decisions either to manage risk or to extract market inefficiencies via trading.'
    },
    
    {
        id: 10,
        question: 'The governing equation looks like it can be analytically solved why is there a need for RL?',
        answer: <p className="answers-api">The Zero Theorem equation can be analytically solved if one has a time dependent value that is dynamically updated for α<sub>k</sub> for k quantity of markets. Since the substitution phenomena is unknow Zero Theorem opts to use deep reinforcement learning to forecast this parameter for every k market for every time interval.</p>
    },
    
    {
        id: 11,
        question: 'Why are they so many models for a singular equation?',
        answer: <p className="answers-api">There are many different machine learning methods that can be used to predict α<sub>k</sub> for k quantity of markets in the Zero Theorem governing equation. Even a singular learning type has multitude of hyper parameters that can be altered to produce a solution. Hence on this website we provide the full range of potential solutions using state of the art machine learning methods.</p>
    },
    
    {
        id: 12,
        question: 'When are positions opened/closed?',
        answer: 'Positions are typically opened and closed only if the model predicts a directional change.'
    },
    
    {
        id: 13,
        question: 'What time zone is used for forecasts?',
        answer: 'UTC however all models reference your local machine clock.'
    },
    
]