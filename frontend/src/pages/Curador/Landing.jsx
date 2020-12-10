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
  DiscreteColorLegend,
} from "react-vis";
import { EXTENDED_DISCRETE_COLOR_RANGE } from "react-vis/dist/theme";
import { Statistic } from "semantic-ui-react";
import { curveCatmullRom } from "d3-shape";
import { metrics } from "../../actions";
import { connect } from "react-redux";
import { userRolTranslation, userTypeTranslation } from "../User/utils";
import { bindActionCreators } from "redux";
import { selectMetrics } from "../../reducers";
import "./styles.css";

const PhotoCountChart = ({ rawData, data2 }) => {
  const mapped = rawData
    ? rawData.map((cnt) => ({
        x: new Date(cnt.date_created).getTime(),
        y: cnt.created_count,
        m: " fotos",
      }))
    : [];
  const mapped2 = data2
    ? data2.map((cnt) => ({
        x: new Date(cnt.date_created).getTime(),
        y: cnt.created_count,
        m: " comentarios",
      }))
    : [];

  const ITEMS = [
    { title: "Fotos", color: "blue" },
    { title: "Comentarios", color: "green" },
  ];

  const [crossHair, setCrosshair] = useState({ crosshairValues: [] });

  const onMouseLeave = () => {
    setCrosshair({ crosshairValues: [] });
  };

  const onNearestX = (value, { index }) => {
    setCrosshair({ crosshairValues: [mapped[index], mapped2[index]] });
  };

  return (
    <Fragment>
      <FlexibleWidthXYPlot
        height={350}
        xType="time"
        margin={{ bottom: 50 }}
        animation={true}
        onMouseLeave={onMouseLeave}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-75} />
        <YAxis />
        <VerticalBarSeries
          barWidth={0.5}
          opacity={0.5}
          color={"blue"}
          data={mapped}
        />
        <LineSeries
          color={"blue"}
          curve={curveCatmullRom.alpha(0.5)}
          data={mapped}
          onNearestX={onNearestX}
        />
        <VerticalBarSeries
          color={"green"}
          barWidth={0.5}
          opacity={0.5}
          data={mapped2}
        />
        <LineSeries
          color={"green"}
          curve={curveCatmullRom.alpha(0.5)}
          data={mapped2}
        />
        <Crosshair
          values={crossHair.crosshairValues}
          titleFormat={function defaultTitleFormat(values) {
            const value = values[0];
            if (value) {
              return {
                title: "Fecha",
                value: new Date(value.x).toLocaleDateString(),
              };
            }
          }}
          itemsFormat={function defaultItemsFormat(values) {
            // eslint-disable-next-line
            return values.map((v, i) => {
              if (v) {
                return { value: v.y, title: "Total" + v.m };
              }
            });
          }}
        />
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend
        height={80}
        width={200}
        items={ITEMS}
        style={{ display: "inline-block" }}
      />
    </Fragment>
  );
};

const DonutChart = ({ rawData, crossHairTitle, crossHairValue }) => {
  const [hintValue, setHintValue] = useState({ value: false });

  const mapped = rawData
    ? rawData.map((el, key) => ({
        angle: el.total,
        title: el.name,
        total: el.total,
        color: EXTENDED_DISCRETE_COLOR_RANGE[key],
      }))
    : [];

  const { value } = hintValue;

  const ITEMS = rawData
    ? rawData.map((el, key) => ({
        title: el.name,
        color: EXTENDED_DISCRETE_COLOR_RANGE[key],
      }))
    : [];

  return (
    <Fragment>
      <RadialChart
        className={"curador-donut-chart"}
        innerRadius={80}
        radius={100}
        data={mapped}
        onValueMouseOver={(v) => setHintValue({ value: v })}
        onSeriesMouseOut={(v) => setHintValue({ value: false })}
        width={200}
        height={200}
        padAngle={0.04}
        colorType={"literal"}
        animation
      >
        {value !== false && (
          <Hint
            value={value}
            format={(el) => {
              return [
                { title: crossHairTitle, value: el.title },
                { title: crossHairValue, value: el.total },
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
    <Container fluid className="dashboard" style={{ textAlign: "center" }}>
      <Row>
        <Col>
          <h2>Estad&iacute;sticas del sitio</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Statistic.Group
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
              }}
            >
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
                  {console.log(general)}
                  {general
                    ? general.count_photo_approved.length > 0
                      ? general.count_photo_approved[0].approved
                        ? general.count_photo_approved[0].total
                        : 0 //general.count_photo_approved[1].total
                      : 0
                    : 0}
                </Statistic.Value>
                <Statistic.Label>Fotos p&uacute;blicas</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {general ? general.count_total_reports : 0}
                </Statistic.Value>
                <Statistic.Label>Número de Reportes</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Fotos y Comentarios subidos por día</h2>
            </Container>
            <hr />
            <Container fluid>
              <PhotoCountChart
                rawData={general ? general.count_photos_by_date : []}
                data2={general ? general.count_comments_by_date : []}
              />
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Caracter&iacute;sticas de usuarios</h2>
            </Container>
            <hr />
            <Container fluid>
              <DonutChart
                rawData={
                  general
                    ? general.count_user_role.map((cnt) => ({
                        total: cnt.total,
                        name: userRolTranslation(cnt.rol_type),
                      }))
                    : []
                }
                crossHairTitle={"Rol de usuario"}
                crossHairValue="Total"
              />
            </Container>
          </div>
        </Col>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Tipos de usuarios</h2>
            </Container>
            <hr />
            <Container fluid>
              <DonutChart
                rawData={
                  general
                    ? general.count_user_type.map((cnt) => ({
                        total: cnt.total,
                        name: userTypeTranslation(cnt.user_type),
                      }))
                    : []
                }
                crossHairTitle={"Tipo de usuario"}
                crossHairValue="Total"
              />
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Categorías con más fotos</h2>
            </Container>
            <hr />
            <Container fluid>
              <DonutChart
                rawData={
                  general
                    ? general.count_popular_categories.map((cnt) => ({
                        total: cnt.num_photos,
                        name: cnt.title,
                      }))
                    : []
                }
                crossHairTitle={"Categorías"}
                crossHairValue="Total"
              />
            </Container>
          </div>
        </Col>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Metadata con más fotos</h2>
            </Container>
            <hr />
            <Container fluid>
              <DonutChart
                rawData={
                  general
                    ? general.count_popular_metadata.map((cnt) => ({
                        total: cnt.num_photos,
                        name: cnt.value,
                      }))
                    : []
                }
                crossHairTitle={"Metadata"}
                crossHairValue="Total"
              />
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  stats: selectMetrics(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadGeneralStats: metrics.getGeneralStats,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Landing);
