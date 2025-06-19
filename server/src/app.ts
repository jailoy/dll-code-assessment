import app from './config/express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';
import routes from './routes/index.route';

// Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Router
app.use('/api', routes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
