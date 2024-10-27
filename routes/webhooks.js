const express = require('express');
const {
  createWebhook,
  getAllWebhooks,
  getWebhookById,
  updateWebhook,
  deleteWebhook,
  triggerWebhook
} = require('../controllers/webhook-controller');

const router = express.Router();

/**
 * @swagger
 * /api/webhooks:
 *   post:
 *     tags: [Webhooks]
 *     summary: Create a new webhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               enable:
 *                 type: boolean
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Webhook created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createWebhook);

/**
 * @swagger
 * /api/webhooks:
 *   get:
 *     tags: [Webhooks]
 *     summary: Retrieve a list of webhooks
 *     responses:
 *       200:
 *         description: A list of webhooks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   enable:
 *                     type: boolean
 *                   urls:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', getAllWebhooks);

/**
 * @swagger
 * /api/webhooks/{id}:
 *   get:
 *     tags: [Webhooks]
 *     summary: Retrieve a specific webhook
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the webhook to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A specific webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 enable:
 *                   type: boolean
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Webhook not found
 */
router.get('/:id', getWebhookById);

/**
 * @swagger
 * /api/webhooks/{id}:
 *   put:
 *     tags: [Webhooks]
 *     summary: Update a specific webhook
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the webhook to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               enable:
 *                 type: boolean
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Webhook updated successfully
 *       404:
 *         description: Webhook not found
 */
router.put('/:id', updateWebhook);

/**
 * @swagger
 * /api/webhooks/{id}:
 *   delete:
 *     tags: [Webhooks]
 *     summary: Delete a specific webhook
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the webhook to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Webhook deleted successfully
 *       404:
 *         description: Webhook not found
 */
router.delete('/:id', deleteWebhook);

/**
 * @swagger
 * /api/webhooks/{id}/trigger:
 *   post:
 *     tags: [Webhooks]
 *     summary: Trigger a specific webhook
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the webhook to trigger
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Webhook triggered successfully
 *       404:
 *         description: Webhook not found or not enabled
 */
router.post('/:id/trigger', triggerWebhook);

module.exports = router;
