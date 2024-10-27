const axios = require('axios');
// *** For more secure id ***
// const { v4: uuidv4 } = require('uuid');

let webhooks = [];
let idCounter = 0;

// Utility for token replacement
function replaceTokens(url, data) {
  return url.replace(/{(\w+)}/g, (_, token) => data[token] || `{${token}}`);
}

// CRUD Handlers
const { body, validationResult, param } = require('express-validator');

// Create
// POST api/webhooks
exports.createWebhook = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('enable').isBoolean().withMessage('Enable must be a true or false!'),
  body('urls').isArray().withMessage('URLs must be an array!'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, enable, urls } = req.body;
    // *** id: uuidv4() ***
    const webhook = { id: idCounter++, name, enable, urls };
    webhooks.push(webhook);
    res.status(201).json(webhook);
  }
];

// Get
// GET /api/webhooks
// GET /api/webhooks/{id}
exports.getAllWebhooks = (req, res) => {
  res.json(webhooks);
};
// Get a single webhook by ID
// *** if you use the more secure way for the id you should comment this row ***
exports.getWebhookById = [
  param('id').isInt().withMessage('ID must be a number'),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.params;
    // *** const webhook = webhooks.find(w => w.id === (id)); ***
    const webhook = webhooks.find(w => w.id === parseInt(id));
    return webhook
      ? res.json(webhook)
      : res.status(404).json({ message: 'Webhook not found' });
  }
];


// Update
// PUT /api/webhooks/{id}
exports.updateWebhook = [
  // *** if you use the more secure way for the id you should comment this row ***
  param('id').isInt().withMessage('ID must be an integer'),
  body('name').optional().notEmpty().withMessage('Name must be provided'),
  body('enable').optional().isBoolean().withMessage('Enable must be true or false'),
  body('urls').optional().isArray().withMessage('URLs must be an array'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, enable, urls } = req.body;
  // *** const webhook = webhooks.find(w => w.id === (id)); ***
    const webhook = webhooks.find(w => w.id === parseInt(id));
    if (!webhook) return res.status(404).json({ message: 'Webhook not found' });

    webhook.name = name !== undefined ? name : webhook.name;
    webhook.enable = enable !== undefined ? enable : webhook.enable;
    webhook.urls = urls !== undefined ? urls : webhook.urls;
    res.json(webhook);
  }
];


// Delete
// DELETE api/webhooks/{id}
exports.deleteWebhook = [
  // *** if you use the more secure way for the id you should comment this row ***
  param('id').isInt().withMessage('ID must be an integer'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
  // *** const index = webhooks.findIndex(w => w.id === (id)); ***
    const index = webhooks.findIndex(w => w.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: 'Webhook not found' });

    webhooks.splice(index, 1);
    res.status(204).end();
  }
];


// Trigger
// POST /api/webhooks/0/trigger
exports.triggerWebhook = [
  // *** if you use the more secure way for the id you should comment this row ***
  param('id').isInt().withMessage('ID must be an integer'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const data = req.body;
  // *** const webhook = webhooks.find(w => w.id === (id)); ***
    const webhook = webhooks.find(w => w.id === parseInt(id));

    if (!webhook || !webhook.enable) {
      return res.status(404).json({ message: 'Webhook not enabled or found' });
    }

    const requests = webhook.urls.map(url => {
      const resolvedUrl = replaceTokens(url, data);
      return axios.post(resolvedUrl, data)
        .then(response => ({ url: resolvedUrl, status: response.status }))
        .catch(error => ({ url: resolvedUrl, error: error.message }));
    });

    Promise.all(requests)
      .then(results => res.json({ webhook: webhook.name, results }))
      .catch(error => res.status(500).json({ message: 'Error triggering webhook', error: error.message }));
  }
];
