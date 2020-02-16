import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Container } from "reactstrap";
import {
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  FlexibleWidthXYPlot,
  Crosshair,
  RadialChart,
  Hint,
  DiscreteColorLegend
} from "react-vis";
import {EXTENDED_DISCRETE_COLOR_RANGE} from "react-vis/dist/theme"
import { Statistic } from "semantic-ui-react";
import { curveCatmullRom } from "d3-shape";

import { curador } from "../../actions";
import { connect } from "react-redux";

import {
  userRolTranslation,
  userTypeTranslation
} from "../UserDashboard/utils";

const PhotoCountChart = ({ rawData }) => {
  const mapped = rawData
    ? rawData.map(cnt => ({
        x: new Date(cnt.date_created).getTime(),
        y: cnt.created_count
      }))
    : [];

  const [crossHair, setCrosshair] = useState({ crosshairValues: [] });

  const onMouseLeave = () => {
    setCrosshair({ crosshairValues: [] });
  };

  const onNearestX = (value, { index }) => {
    setCrosshair({ crosshairValues: [mapped[index]] });
  };

  return (
    <FlexibleWidthXYPlot
      height={350}
      xType="time"
      margin={{ bottom: 125 }}
      animation={true}
      onMouseLeave={onMouseLeave}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickLabelAngle={-75} />
      <YAxis />
      <VerticalBarSeries data={mapped} />
      <LineSeries
        curve={curveCatmullRom.alpha(0.5)}
        data={mapped}
        onNearestX={onNearestX}
      />
      <Crosshair
        values={crossHair.crosshairValues}
        titleFormat={function defaultTitleFormat(values) {
          const value = values[0];
          if (value) {
            return {
              title: "Fecha",
              value: new Date(value.x).toLocaleDateString()
            };
          }
        }}
        itemsFormat={function defaultItemsFormat(values) {
          return values.map((v, i) => {
            if (v) {
              return { value: v.y, title: "Total" };
            }
          });
        }}
      />
    </FlexibleWidthXYPlot>
  );
};

const DonutChart = ({ rawData, crossHairTitle, crossHairValue }) => {
  const [hintValue, setHintValue] = useState({ value: false });

  const mapped = rawData
    ? rawData.map((el,key) => ({ angle: el.total, title: el.name, total: el.total, color: EXTENDED_DISCRETE_COLOR_RANGE[key] }))
    : [];

  const { value } = hintValue;

  const ITEMS = rawData ? rawData.map((el,key) => ({title: el.name, color: EXTENDED_DISCRETE_COLOR_RANGE[key]})) : [];

  return (
    <Fragment>
      <RadialChart
        className={"curador-donut-chart"}
        innerRadius={80}
        radius={100}
        data={mapped}
        onValueMouseOver={v => setHintValue({ value: v })}
        onSeriesMouseOut={v => setHintValue({ value: false })}
        width={200}
        height={200}
        padAngle={0.04}
        colorType={"literal"}
        animation>
        {value !== false && (
          <Hint
            value={value}
            format={el => {
              console.log(el);
              return [
                { title: crossHairTitle, value: el.title },
                { title: crossHairValue, value: el.total }
              ];
            }}
          />
        )}
      </RadialChart>
      <DiscreteColorLegend
        height={200}
        width={200}
        items={ITEMS}
        style={{ display: "inline-block" }}
      />
    </Fragment>
  );
};

const Landing = ({ stats: { general }, loadGeneralStats }) => {
  useEffect(() => {
    loadGeneralStats();
  }, [loadGeneralStats]);

  return (
    <Container className="children-margin" style={{ textAlign: "center" }}>
      <Row>
        <Col>
          <h2>Estad&iacute;sticas del sitio</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ width: "max-content", margin: "0 auto" }}>
            <Statistic.Group>
              <Statistic>
                <Statistic.Value>
                  {general ? general.count_photo : 0}
                </Statistic.Value>
                <Statistic.Label>Fotos en el sistema</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {general ? general.count_total_users : 0}
                </Statistic.Value>
                <Statistic.Label>Usuarios registrados</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {general && general.count_photo_approved.length > 0
                    ? general.count_photo_approved[0].approved
                      ? general.count_photo_approved[0].total
                      : general.count_photo_approved[1].total
                    : 0}
                </Statistic.Value>
                <Statistic.Label>Fotos p&uacute;blicas</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Fotos subidas por dia</h3>
          <PhotoCountChart
            rawData={general ? general.count_photos_by_date : []}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Tipos de usuarios</h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <DonutChart
            rawData={
              general
                ? general.count_user_role.map(cnt => ({
                    total: cnt.total,
                    name: userRolTranslation(cnt.rol_type)
                  }))
                : []
            }
            crossHairTitle={"Rol de usuario"}
            crossHairValue="Total"
          />
        </Col>
        <Col md={6}>
          <DonutChart
            rawData={
              general
                ? general.count_user_type.map(cnt => ({
                    total: cnt.total,
                    name: userTypeTranslation(cnt.user_type)
                  }))
                : []
            }
            crossHairTitle={"Tipo de usuario"}
            crossHairValue="Total"
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  stats: state.curador.stats
});

const mapActionsToProps = dispatch => ({
  loadGeneralStats: () => dispatch(curador.getGeneralStats())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Landing);