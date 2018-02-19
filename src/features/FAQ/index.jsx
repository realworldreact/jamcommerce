import React from 'react';
import classnames from 'classnames/bind';

import styles from './faq-module.styl';

const questions = {
  products: [
    {
      question: 'How is inventory added/removed?',
      answer:
        "Inventory is managed through the Netlify CMS on <site>/admin/ . You can use this interface to manage the set of markdown files in content/*, which the jamcommerce site then uses to generate pages for each product using Gatsby's markdown-as-web-page infrastructure.",
    },
    {
      question: 'How is inventory tracked?',
      answer:
        'We use Gocommerce to handle inventory and sales. It runs on a server, stores things in a database (sqlite, postgres, etc), and the frontend talks to it via an API. We just need to call apropriate functions in the provided javascript library. Each product has a small <script> tag that Gocommerce can read to understand which product is being sold.',
    },
    {
      question: 'How do I add or subtract products? ',
      answer:
        'You can use the Netlify CMS to create and remove products. The jamcommerce webapp lets users add and subtract products in their cart via a dropdown menu. This info is stored in javascript memory and once added to the cart, backed up in local storage so users can reload the page and maintain their cart.',
    },
  ],
  cart: [
    {
      question: 'How is inventory tracked?',
      answer:
        'We use Gocommerce to handle inventory and sales. It runs on a server, stores things in a database (sqlite, postgres, etc), and the frontend talks to it via an API. We just need to call apropriate functions in the provided javascript library. Each product has a small <script> tag that Gocommerce can read to understand which product is being sold.',
    },
    {
      question: 'How do I add or subtract products? ',
      answer:
        'You can use the Netlify CMS to create and remove products. The jamcommerce webapp lets users add and subtract products in their cart via a dropdown menu. This info is stored in javascript memory and once added to the cart, backed up in local storage so users can reload the page and maintain their cart.',
    },
  ],
  checkout: [
    {
      question: 'Where is user info stored?',
      answer:
        'For this application, we put all user info in browser localstorage. You can integrate whichever data storage system you want like Firebase or similar. Data is stored as a JSON object that the code reads and overwrites. Anything that supports reading and writing JSON objects should work.',
    },
    {
      question: 'Where is credit card info stored?',
      answer:
        "For this application, we used Stripe to process credit-card transactions. You can integrate whatever third party payment processor you'd like into your app, such as Paypal. That way you can abstract the maintenance and responsibility out of your application's architecture entirely. ",
    },
  ],
  signin: [
    {
      question: 'Where is user info stored?',
      answer:
        "User auth is stored in localstorage for simplicity. It's saved and read as a JSON object so you can integrate any persistence layer that supports reading and saving JSON objects.",
    },
    {
      question: "How do I guarantee the security of my users' info? ",
      answer:
        'You should always make sure to save user passwords as salted hashes and always serve your website via https. Consider using a 3rd party authentication library',
    },
  ],
  account: [
    {
      question: 'Where is user info stored?',
      answer:
        'For this application, we put all user info in browser localstorage. You can integrate whichever data storage system you want like Firebase or similar. Data is stored as a JSON object that the code reads and overwrites. Anything that supports reading and writing JSON objects should work.',
    },
    {
      question: "How do I guarantee the security of my users' info? ",
      answer:
        'You should always make sure to save user passwords as salted hashes and always serve your website via https. Consider using a 3rd party authentication library',
    },
    {
      question: 'How are passwords reset? ',
      answer:
        'Passwords are saved in localstorage so resetting is just a matter of overwriting it. In a production setting, this depends on the authentication scheme/library you decide to use.',
    },
  ],
};

const cx = classnames.bind(styles);

const FAQ = ({ type }) =>
  <div className={cx('faq')}>
    <div className={cx('faq-inner')}>
      <h3>Developer FAQ</h3>
      <dl>
        {questions[type].map(({ question, answer }) =>
          <React.Fragment>
            <dt key={question}>
              {question}
            </dt>
            <dd>
              {answer}
            </dd>
          </React.Fragment>,
        )}
      </dl>
    </div>
  </div>;

export default FAQ;
