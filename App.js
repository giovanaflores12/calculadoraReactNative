import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView, SafeAreaView } from 'react-native';

import soma from './components/soma';
import subtracao from './components/subtracao';
import multiplicacao from './components/multiplicacao';
import divisao from './components/divisao';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const limparCampos = () => {
    setNum1('');
    setNum2('');
    setResultado(null);
    Keyboard.dismiss();
  };

  const limparHistorico = () => {
    setHistorico([]);
  };

  const calcular = (operacao) => {
    Keyboard.dismiss();

    if (num1.trim() === '' || num2.trim() === '') {
      setResultado("Preencha os dois campos!");
      return;
    }

    const valor1 = parseFloat(num1);
    const valor2 = parseFloat(num2);
    let res;
    let sinal;

    switch (operacao) {
      case 'soma':
        res = soma(valor1, valor2);
        sinal = '+';
        break;
      case 'subtracao':
        res = subtracao(valor1, valor2);
        sinal = '-';
        break;
      case 'multiplicacao':
        res = multiplicacao(valor1, valor2);
        sinal = '×';
        break;
      case 'divisao':
        res = divisao(valor1, valor2);
        sinal = '÷';
        break;
    }

    const resultadoFormatado = String(res);
    setResultado(resultadoFormatado);

    if (typeof res === 'number') {
      const novaOperacao = `${valor1} ${sinal} ${valor2} = ${resultadoFormatado}`;
      setHistorico([novaOperacao, ...historico]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Calculadora</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Primeiro número"
            keyboardType="numeric"
            value={num1}
            onChangeText={(t) => { setNum1(t.replace(',', '.')); setResultado(null); }}
          />

          <TextInput
            style={styles.input}
            placeholder="Segundo número"
            keyboardType="numeric"
            value={num2}
            onChangeText={(t) => { setNum2(t.replace(',', '.')); setResultado(null); }}
          />

          <View style={styles.row}>
            <TouchableOpacity style={[styles.botao, styles.btnOp]} onPress={() => calcular('soma')}>
              <Text style={styles.txtBotao}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.btnOp]} onPress={() => calcular('subtracao')}>
              <Text style={styles.txtBotao}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.btnOp]} onPress={() => calcular('multiplicacao')}>
              <Text style={styles.txtBotao}>×</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.btnOp]} onPress={() => calcular('divisao')}>
              <Text style={styles.txtBotao}>÷</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnLimpar} onPress={limparCampos}>
            <Text style={styles.txtLimpar}>LIMPAR CAMPOS</Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.cardResultado}>
            <Text style={styles.labelResultado}>RESULTADO</Text>
            <Text style={styles.valorResultado}>{resultado}</Text>
          </View>
        )}

        <View style={styles.secaoHistorico}>
          <View style={styles.headerHistorico}>
            <Text style={styles.tituloHistorico}>Histórico</Text>
            {historico.length > 0 && (
              <TouchableOpacity onPress={limparHistorico}>
                <Text style={styles.txtApagarHistorico}>Apagar</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {historico.length === 0 ? (
            <Text style={styles.txtVazio}>Nenhuma operação realizada</Text>
          ) : (
            historico.map((item, index) => (
              <View key={index} style={styles.itemHistorico}>
                <Text style={styles.txtItemHistorico}>{item}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: {
    backgroundColor: '#F8F9FA',
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#007AFF',
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 3,
  },
  btnOp: {
    backgroundColor: '#4361EE',
  },
  txtBotao: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  btnLimpar: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#E7DEE1',
    borderColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLimpar: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardResultado: {
    backgroundColor: '#4361EE',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  labelResultado: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valorResultado: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  secaoHistorico: {
    marginTop: 30,
  },
  headerHistorico: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tituloHistorico: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  txtApagarHistorico: {
    color: '#4361EE',
    fontWeight: '600',
  },
  itemHistorico: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4361EE',
  },
  txtItemHistorico: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  txtVazio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  },
});