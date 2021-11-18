// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;






contract CreateDegree{

	  constructor()  {
          
      }

	


	event  certificato_creato(
			DegreeBlock degree,
				string laurea,
				string nomeLaureando,
				string codiceFiscaleLaureando,
				string nomeRealatore);




	function crea_certificato_di_laurea(
					string memory laurea,
					string memory nomeLaureando,
					string memory codiceFiscaleLaureando,
					string memory nomeRealatore,
					address[] memory commisione,
					string[] memory nomePersoneNellaCommissione) public returns ( address  ){
		DegreeBlock degree= new DegreeBlock(
				 	laurea,
					nomeLaureando,
					codiceFiscaleLaureando,
					nomeRealatore,
					commisione,
					nomePersoneNellaCommissione

		);

		emit certificato_creato(degree, laurea, nomeLaureando, codiceFiscaleLaureando, nomeRealatore);

		return address(degree);


	


	}


}





contract DegreeBlock {
	//mapping (address => uint) balances;
	string laurea;
	string nomeLaureando;
	string codiceFiscaleLaureando;
	string nomeRealatore;
	address [] commisione;
	mapping (address => bool) hasSigned;
	mapping (address => string) nome_cognome;

	//event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor(	
				string memory laurea_,
				string memory nomeLaureando_,
				string memory codiceFiscaleLaureando_,
				string memory nomeRealatore_,
				address[] memory commisione_,
				string[] memory nomePersoneNellaCommissione_) public {
		laurea=laurea_;
		nomeLaureando=nomeLaureando_;
		codiceFiscaleLaureando=codiceFiscaleLaureando_;
		nomeRealatore=nomeRealatore_;

	}

	function get_laurea() public view returns (string memory){
		return laurea;
	}

}
