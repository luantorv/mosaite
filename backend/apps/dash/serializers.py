from rest_framework import serializers


class EvolucionHistoricaSerializer(serializers.Serializer):
    """Serializer para evolución histórica mensual"""
    mes = serializers.CharField()
    asientos = serializers.IntegerField()
    cobertura = serializers.IntegerField()


class ActividadGrupoSerializer(serializers.Serializer):
    """Serializer para actividad por grupo"""
    grupo = serializers.CharField()
    asientos = serializers.IntegerField()
    cobertura = serializers.IntegerField()


class DashboardDataSerializer(serializers.Serializer):
    """Serializer para datos del dashboard"""
    total_alumnos = serializers.IntegerField(source='total-alumnos')
    cantidad_grupos = serializers.IntegerField(source='cantidad-grupos')
    asientos_cargados = serializers.IntegerField(source='asientos-cargados')
    libros_diarios = serializers.IntegerField(source='libros-diarios')
    evolucion_historica = EvolucionHistoricaSerializer(
        many=True, 
        source='evolucionHistorica'
    )
    actividad_por_grupo = ActividadGrupoSerializer(
        many=True,
        source='actividadPorGrupo'
    )
    alerta = serializers.CharField(allow_null=True, required=False)