import React from 'react'
import { VegaLite } from 'react-vega'
import { Grid, Row } from 'react-bootstrap'
/* eslint-disable no-unused-vars */
import { VisualizationSpec } from 'vega-embed'
import { compactNumbers } from '../../utils/helpers'
/* eslint-disable no-unused-vars */
// import { Attribute } from '../PersonContainer/PersonContainer'

interface ChartRecord {
  title: string
  count: number
}

type Props = {
  data?: ChartRecord[]
  doi?: string
  count?: number
  legend?: any
}

const actions = {
  export: true,
  source: false,
  compiled: false,
  editor: false
}

/* eslint-disable no-unused-vars */
const TypesChart: React.FunctionComponent<Props> = ({
  data,
  doi,
  count,
  legend
}) => {
  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A simple donut chart with embedded data.',
    data: {
      name: 'table'
    },
    layer: [
      {
        mark: {
          type: 'arc',
          innerRadius: 70,
          cursor: 'pointer',
          tooltip: true
        },
        encoding: {
          theta: {
            field: 'count',
            type: 'quantitative',
            sort: 'descending'
          },
          color: {
            field: 'title',
            title: 'Type',
            type: 'nominal',
            legend: legend,
            scale: {
              scheme: 'viridis'
            }
          }
        }
      },
      {
        mark: {
          type: 'text',
          fill: '#767676',
          align: 'center',
          baseline: 'middle',
          fontSize: 36
        },
        encoding: {
          text: { value: compactNumbers(count) }
        }
      }
    ],
    view: {
      stroke: null
    }
  }

  return (
    <div className="panel panel-transparent">
      <div className="types-chart panel-body">
        <Grid>
          <Row>
            <VegaLite
              renderer="svg"
              spec={spec}
              data={{ table: data }}
              actions={actions}
            />
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default TypesChart
