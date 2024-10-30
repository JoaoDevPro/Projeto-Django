from django.db import models

class Usuario(models.Model):
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    

class Risco(models.Model):
    descricao = models.CharField(max_length=255)  # Corrigido para CharField
    tipo = models.CharField(max_length=255)
    probabilidade = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    classificacao = models.CharField(max_length=255)
    projeto = models.CharField(max_length=255)
    data_entrada = models.DateField()
    impacto = models.CharField(max_length=255)
    consequencia = models.CharField(max_length=255)
    jalon_afetado = models.CharField(max_length=255)
    metier = models.CharField(max_length=255)
    status = models.IntegerField()
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, to_field='id', verbose_name="Usuário")

    def __str__(self):
        return self.descricao

class Piloto(models.Model):
    nome = models.CharField(max_length=255)

class Solucao(models.Model):
    estrategia = models.CharField(max_length=255)
    probabilidade_residual = models.FloatField()
    impacto_residual = models.CharField(max_length=255)
    validacao_acao = models.CharField(max_length=255)
    data_alerta = models.DateField()
    nome_piloto = models.CharField(max_length=255)
    id_piloto = models.ForeignKey(Piloto, on_delete=models.CASCADE, to_field='id')
    captalizacao = models.BooleanField()
    inicio_plano_acao = models.DateField()
    acao = models.CharField(max_length=255)
    comentario = models.CharField(max_length=255)
    data_resolucao = models.DateField()
    id_risco = models.ForeignKey(Risco, on_delete=models.CASCADE, to_field='id')

    def __str__(self):
        return self.estrategia

class Item(models.Model):  # Corrigido para começar com letra maiúscula
    name = models.CharField(max_length=100)


