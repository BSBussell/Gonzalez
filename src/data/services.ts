export type Service = {
  id: string
  title: string
  navigationLabel: string
  shortLabel: string
  requestLabel: string
  summary: string
  details: string[]
  disclaimer?: string
}

export const SERVICES: Service[] = [
  {
    id: 'commercial',
    title: 'Commercial HVAC',
    navigationLabel: 'Commercial HVAC',
    shortLabel: 'Commercial',
    requestLabel: 'Commercial HVAC',
    summary: 'Installations, maintenance, and diagnostics for offices and storefronts.',
    details: [
      'Rooftop units, split systems, and ventilation checks',
      'Seasonal inspections and filter programs',
      'Priority response for contract clients',
    ],
  },
  {
    id: 'residential',
    title: 'Residential HVAC',
    navigationLabel: 'Residential HVAC',
    shortLabel: 'Residential',
    requestLabel: 'Residential HVAC',
    summary: 'Tune-ups, replacements, and comfort upgrades for your home.',
    details: [
      'Furnace & heat pump diagnostics',
      'AC performance testing and coil cleaning',
      'Thermostat calibration & smart setup',
    ],
  },
  {
    id: 'repairs',
    title: 'Service & Repairs',
    navigationLabel: 'Service & Repair',
    shortLabel: 'Service & Repair',
    requestLabel: 'Service & Repair',
    summary: 'Heating and cooling troubleshooting for no-heat, no-cool, and airflow problems.',
    details: [
      'No-cool/no-heat calls',
      'Electrical & airflow issues',
      'Upfront estimates before work',
    ],
  },
  {
    id: 'gas-lines',
    title: 'Gas Lines',
    navigationLabel: 'Gas Lines',
    shortLabel: 'Gas Lines',
    requestLabel: 'Gas Lines',
    summary: 'Gas line routing, testing, and safety checks.',
    details: [
      'Leak detection and pressure tests',
      'New line runs to appliances or units',
      'Code compliance documentation',
    ],
  },
  {
    id: 'line-runs',
    title: 'Line Runs (No Install)',
    navigationLabel: 'Line Runs',
    shortLabel: 'Line Runs',
    requestLabel: 'Line Runs',
    summary: 'We run lines; we do not install appliances/units.',
    details: [
      'Refrigerant and gas line routing',
      'Proper supports, insulation, and sealing',
      'Handover ready for third-party installation',
    ],
    disclaimer: 'This line-running service does not include appliance or unit installation.',
  },
]
