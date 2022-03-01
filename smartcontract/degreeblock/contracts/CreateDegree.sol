// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;






contract CreateDegree{

	mapping (address => string) nome_cognome;
	mapping (address => bool) is_istazied;

	address cordinatoreCorso = 0xf472a171dc35fD30a2462dD5CDCF5F39b26dc390;
	constructor()  {}

	function change_cordinatoreCorso(address new_cordinatore) public {
		require(new_cordinatore != 0x0000000000000000000000000000000000000000 
				&& msg.sender == cordinatoreCorso);
		cordinatoreCorso = new_cordinatore;
	}

	function is_valid_certificate( address  _address) public view returns (bool){
		return is_istazied[_address];
	}

	function set_nome_cognome(string memory _nome_cognome) public{
		nome_cognome[msg.sender] = _nome_cognome;
	}

	function get_nome_cognome(address _address) public view returns (string memory) {
		return nome_cognome[_address];
	}

	event  certificato_creato(
			DegreeBlock degree,
				string laurea,
				uint256 timestamp_creation,
				address[] commisione);

	function crea_certificato_di_laurea(
					string memory laurea,
					string memory nomeLaureando,
					string memory codiceFiscaleLaureando,
					string memory nomeRealatore,
					address[] memory commisione
						) public returns ( address  ){
		
		require(msg.sender == cordinatoreCorso, 
				"Solo il cordinatore del corso puo creare un certificato di laura");
		
		uint256 timestamp=  block.timestamp;
		DegreeBlock degree= new DegreeBlock(
				 	laurea,
					nomeLaureando,
					codiceFiscaleLaureando,
					nomeRealatore,
					timestamp,
					commisione
		);

		emit certificato_creato(degree, laurea,timestamp,commisione);
		is_istazied[address(degree)]=true;
		return address(degree);

	}


}

contract DegreeBlock {
	string laurea;
	string nomeLaureando;
	string codiceFiscaleLaureando;
	string nomeRealatore;
	address [] commisione;
	uint256 timestamp_creation;
	mapping (address => bool) hasSigned;

	
	struct degree{
		string laurea;
		string nomeLaureando;
		string codiceFiscaleLaureando;
		string nomeRealatore;
		uint256 timestamp_creation;
		address [] commisione;
	}
	
	constructor(	
				string memory laurea_,
				string memory nomeLaureando_,
				string memory codiceFiscaleLaureando_,
				string memory nomeRealatore_,
				uint256 timestamp_creation_,
				address[] memory commisione_
				)   {
		timestamp_creation=timestamp_creation_;
		laurea=laurea_;
		nomeLaureando=nomeLaureando_;
		codiceFiscaleLaureando=codiceFiscaleLaureando_;
		nomeRealatore=nomeRealatore_;
		for(uint i=0; i<commisione_.length; i++){
			commisione.push(commisione_[i]);
		}

	}

	function is_in_array(address addr, address[] memory array)pure internal returns (bool){
		for(uint i=0; i<array.length; i++){
			if(addr == array[i]){
				return true;
			}
		}
		return false;
	}

	function sign() public {
		require(is_in_array(msg.sender, commisione), "Il professore non e' nella commisione");
		require(!hasSigned[msg.sender], "Il professore ha gia firmato il certificato");
		hasSigned[msg.sender]=true;
	}

	function has_signed(address signer) public view returns (bool){
		return hasSigned[signer];
	}

	function get_degree() public view returns (degree memory){
		return degree(
				laurea,
				nomeLaureando,
				codiceFiscaleLaureando,
				nomeRealatore,
				timestamp_creation,
				commisione
		);
	}

}
