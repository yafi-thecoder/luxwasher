// src/ai/flows/estimate-laundry-cost.ts
'use server';

/**
 * @fileOverview Estimates the cost of laundry services based on pieces, item descriptions, and material composition.
 *
 * - estimateLaundryCost - A function that estimates the laundry cost.
 * - EstimateLaundryCostInput - The input type for the estimateLaundryCost function.
 * - EstimateLaundryCostOutput - The return type for the estimateLaundryCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateLaundryCostInputSchema = z.object({
  pieces: z.number().describe('The number of laundry pieces.'),
  items: z.string().describe('A description of the laundry items.'),
  materialComposition: z.string().describe('The material composition of the laundry items.'),
});
export type EstimateLaundryCostInput = z.infer<typeof EstimateLaundryCostInputSchema>;

const EstimateLaundryCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated cost for the laundry service.'),
  serviceType: z.string().describe('The type of laundry service recommended.'),
  notes: z.string().describe('Any notes or disclaimers about the estimate.'),
});
export type EstimateLaundryCostOutput = z.infer<typeof EstimateLaundryCostOutputSchema>;

export async function estimateLaundryCost(input: EstimateLaundryCostInput): Promise<EstimateLaundryCostOutput> {
  return estimateLaundryCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateLaundryCostPrompt',
  input: {schema: EstimateLaundryCostInputSchema},
  output: {schema: EstimateLaundryCostOutputSchema},
  prompt: `You are a laundry service cost estimator. Estimate the cost for the provided laundry details.

Number of Pieces: {{pieces}}
Item Descriptions: {{items}}
Material Composition: {{materialComposition}}

Consider common laundry service options and provide an estimated cost, recommended service type, and any relevant notes or disclaimers.
If a matching or similar material can't be found in the system, inform the user. Be vague about how close a material type matches.
`,
});

const estimateLaundryCostFlow = ai.defineFlow(
  {
    name: 'estimateLaundryCostFlow',
    inputSchema: EstimateLaundryCostInputSchema,
    outputSchema: EstimateLaundryCostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
