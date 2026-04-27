export type Service = {
  id: string
  title: string
  summary: string
  details: string[]
  disclaimer?: string
}

export const SERVICES: Service[] = [
  {
    id: 'commercial',
    title: 'Commercial HVAC',
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
    summary: 'Rapid troubleshooting to get you back online.',
    details: [
      'No-cool/no-heat calls',
      'Electrical & airflow issues',
      'Upfront estimates before work',
    ],
  },
  {
    id: 'gas-lines',
    title: 'Gas Lines',
    summary: 'Licensed gas line service and safety checks.',
    details: [
      'Leak detection and pressure tests',
      'New line runs to appliances or units',
      'Code compliance documentation',
    ],
  },
  {
    id: 'line-runs',
    title: 'Line Runs (No Install)',
    summary: 'We run lines; we do not install appliances/units.',
    details: [
      'Refrigerant and gas line routing',
      'Proper supports, insulation, and sealing',
      'Handover ready for third-party installation',
    ],
    disclaimer: 'Gonzalez runs lines but does not perform appliance/unit installs.',
  },
]
